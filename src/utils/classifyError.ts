export type ErrorKey =
  | 'network' | 'session' | 'credentials' | 'emailTaken' | 'weakPassword'
  | 'cameraDenied' | 'locationDenied' | 'fileTooBig' | 'validation' | 'alreadyDone' | 'duplicatePhoto' | 'unknown';

/** Error propio de la app: lleva una clave, nunca un código técnico visible. */
export class AppError extends Error {
  key: ErrorKey;
  cause?: unknown;
  constructor(key: ErrorKey, cause?: unknown) {
    super(key);
    this.key = key;
    this.cause = cause;
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
