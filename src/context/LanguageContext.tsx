import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getLanguage, setLanguage } from '../i18n';

type LangState = { lang: 'es' | 'en'; changeLang: (l: 'es' | 'en') => void };
const LanguageContext = createContext<LangState | null>(null);

/** Al cambiar de idioma el árbol se vuelve a pintar entero (ver App.tsx, key={lang}). */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'es' | 'en'>(getLanguage());
  const changeLang = useCallback((l: 'es' | 'en') => {
    setLanguage(l);
    setLang(l);
  }, []);
  const value = useMemo(() => ({ lang, changeLang }), [lang, changeLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de LanguageProvider');
  return ctx;
}
