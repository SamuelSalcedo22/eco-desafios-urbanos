import React, { createContext, useContext } from 'react';
import { contentOn } from '../../design';

/** Color de texto/iconos según la superficie donde están (para que se lean en claro y en oscuro). */
const ContentColorContext = createContext<string | null>(null);

export function OnSurface({ bg, children }: { bg?: string; children: React.ReactNode }) {
  return <ContentColorContext.Provider value={contentOn(bg)}>{children}</ContentColorContext.Provider>;
}

export const useContentColor = () => useContext(ContentColorContext);
