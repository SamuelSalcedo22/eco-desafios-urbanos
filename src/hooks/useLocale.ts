import { getLanguage } from '../i18n';
import type { Mission } from '../types';

/** Devuelve el texto de una misión en el idioma activo. */
export function missionText(m: Mission) {
  const lang = getLanguage();
  return {
    title: m.title[lang],
    summary: m.summary[lang],
    steps: m.steps[lang],
  };
}
