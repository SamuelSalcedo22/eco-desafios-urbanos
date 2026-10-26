import { t } from '../i18n';
import { classifyError } from './classifyError';

export { AppError, classifyError } from './classifyError';
export type { ErrorKey } from './classifyError';

export type UserError = { what: string; why?: string; action: string };

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
