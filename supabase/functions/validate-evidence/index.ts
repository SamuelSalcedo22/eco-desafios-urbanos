import { createClient } from 'npm:@supabase/supabase-js@2';
import { decideVerdict, isValidCoordinate } from './verdict.ts';
import { getAccessToken, validateWithGemini } from './vertex.ts';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB por imagen

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

/** Errores con clave (no mensajes técnicos): el cliente los traduce al idioma del usuario. */
function fail(errorKey: string, status: number) {
  return json({ errorKey }, status);
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return fail('unknown', 405);

  const url = Deno.env.get('SUPABASE_URL')!;
  const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // 1) Autenticación: el usuario sale del token, nunca del cuerpo de la petición.
  const authHeader = req.headers.get('Authorization') ?? '';
  const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: authError } = await userClient.auth.getUser();
  if (authError || !userData.user) return fail('session', 401);
  const userId = userData.user.id;

  // 2) Entrada
  let body: { missionId?: string; images?: string[]; latitude?: number; longitude?: number };
  try {
    body = await req.json();
  } catch {
    return fail('unknown', 400);
  }
  const images = Array.isArray(body.images) ? body.images : [];
  if (!body.missionId || images.length < 1 || images.length > 2 || images.some((i) => typeof i !== 'string')) {
    return fail('validation', 400);
  }
  if (images.some((i) => Math.floor((i.length * 3) / 4) > MAX_IMAGE_BYTES)) return fail('fileTooBig', 413);

  const admin = createClient(url, service);

  // 3) La misión (puntos, pista de visión) se lee de la base de datos, no del cliente.
  const { data: mission } = await admin.from('missions').select('*').eq('id', body.missionId).eq('active', true).single();
  if (!mission) return fail('validation', 404);
  if (mission.evidence_mode === 'before_after' && images.length !== 2) return fail('validation', 400);

  // 4) Antifraude barato antes de gastar IA: misión ya aprobada hoy y foto repetida.
  const photoHash = await sha256Hex(images.join('|'));
  const { data: doneToday } = await admin.from('submissions').select('id')
    .eq('user_id', userId).eq('mission_id', mission.id).eq('verdict', 'approved')
    .eq('day', new Date().toISOString().slice(0, 10)).limit(1);
  if (doneToday && doneToday.length > 0) return fail('alreadyDone', 409);
  const { data: samePhoto } = await admin.from('submissions').select('id')
    .eq('user_id', userId).eq('photo_hash', photoHash).limit(1);
  if (samePhoto && samePhoto.length > 0) return fail('duplicatePhoto', 409);

  // 5) Visión por computador con Vertex AI (Gemini)
  const hasLocation = isValidCoordinate(body.latitude, body.longitude);
  let ai;
  try {
    const sa = JSON.parse(Deno.env.get('GCP_SERVICE_ACCOUNT_JSON') ?? '{}');
    const token = await getAccessToken(sa);
    ai = await validateWithGemini({
      token,
      project: Deno.env.get('GCP_PROJECT_ID')!,
      location: Deno.env.get('GCP_LOCATION') ?? 'us-central1',
      model: Deno.env.get('GEMINI_MODEL') ?? 'gemini-2.5-flash',
      missionHint: mission.vision_hint,
      images,
      beforeAfter: mission.evidence_mode === 'before_after',
    });
  } catch (e) {
    console.error('vertex error', (e as Error).message);
    return fail('validation', 502);
  }

  const verdict = decideVerdict(ai, mission.requires_location, hasLocation);
  const pointsAwarded = verdict === 'approved' ? mission.points : 0;

  // 6) Guardar con service role (el cliente no puede escribir veredictos).
  const { error: insertError } = await admin.from('submissions').insert({
    user_id: userId,
    mission_id: mission.id,
    verdict,
    points_awarded: pointsAwarded,
    ai_confidence: ai.confidence,
    ai_reason: ai.reason,
    latitude: hasLocation ? body.latitude : null,
    longitude: hasLocation ? body.longitude : null,
    photo_hash: photoHash,
  });
  if (insertError) {
    // 23505 = índice único (carrera entre dos envíos iguales)
    return fail(insertError.code === '23505' ? 'alreadyDone' : 'unknown', insertError.code === '23505' ? 409 : 500);
  }

  return json({ verdict, points: pointsAwarded, reason: ai.reason });
});
