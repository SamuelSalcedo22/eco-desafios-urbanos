import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { es } from './es';
import { en } from './en';

export const i18n = new I18n({ es, en });
i18n.defaultLocale = 'es';
i18n.enableFallback = true;

const deviceLang = getLocales()[0]?.languageCode ?? 'es';
i18n.locale = deviceLang === 'en' ? 'en' : 'es';

export const t = (key: string, options?: Record<string, unknown>): string =>
  i18n.t(key, options);

export function setLanguage(lang: 'es' | 'en'): void {
  i18n.locale = lang;
}

export function getLanguage(): 'es' | 'en' {
  return i18n.locale === 'en' ? 'en' : 'es';
}
