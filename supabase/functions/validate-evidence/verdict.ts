export type Verdict = 'approved' | 'review' | 'rejected';

export type AiResult = { matches: boolean; confidence: number; reason: string };

/**
 * La IA APOYA la decisión, no es el único mecanismo:
 * - alta confianza + ubicación (si la misión la exige) => aprobada
 * - confianza media, o falta la ubicación requerida     => revisión humana
 * - no coincide o confianza baja                         => rechazada
 */
export function decideVerdict(ai: AiResult, requiresLocation: boolean, hasLocation: boolean): Verdict {
  if (!ai.matches || ai.confidence < 0.4) return 'rejected';
  if (ai.confidence < 0.75) return 'review';
  if (requiresLocation && !hasLocation) return 'review';
  return 'approved';
}

export function isValidCoordinate(lat: unknown, lng: unknown): boolean {
  return (
    typeof lat === 'number' && typeof lng === 'number' &&
    Number.isFinite(lat) && Number.isFinite(lng) &&
    Math.abs(lat) <= 90 && Math.abs(lng) <= 180
  );
}
