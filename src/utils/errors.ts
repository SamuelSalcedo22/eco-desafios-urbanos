import { t } from '../i18n';

export type UserError = { what: string; why?: string; action: string };

export type ErrorKey =
  | 'network' | 'session' | 'credentials' | 'emailTaken' | 'weakPassword'
  | 'cameraDenied' | 'locationDenied' | 'fileTooBig' | 'validation' | 'unknown';

/** Error propio de la app: lleva una clave, nunca un código técnico visible. */
export class AppError extends Error {
  constructor(public key: ErrorKey, public cause?: unknown) {
    super(key);
  }
}

/** Traduce mensajes técnicos (Supabase, red) a una clave de error amigable. */
export function classifyError(err: unknown): ErrorKey {
  if (err instanceof AppError) return err.key;
  const msg = String((err as { message?: string })?.message ?? err ?? '').toLowerCase();
  if (msg.includes('invalid login')) return 'credentials';
  if (msg.includes('already registered') || msg.includes('already been registered')) return 'emailTaken';
  if (msg.includes('at least') && msg.includes('password')) return 'weakPassword';
  if (msg.includes('jwt') || msg.includes('refresh token')) return 'session';
  if (msg.includes('network') || msg.includes('failed to fetch') || msg.includes('timeout')) return 'network';
  return 'unknown';
}

/** Devuelve las tres partes del mensaje: qué pasó, por qué (si ayuda) y qué hacer. */
export function toUserError(err: unknown): UserError {
  const key = classifyError(err);
  const base = `errors.${key}`;
  const why = t(`${base}.why`, { defaultValue: '' });
  return {
    what: t(`${base}.what`),
    why: why || undefined,
    action: t(`${base}.action`),
  };
}
