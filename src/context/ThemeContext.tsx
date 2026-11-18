import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyScheme, type Scheme } from '../design';

export type ThemeMode = 'system' | 'light' | 'dark';
const KEY = 'eco.themeMode';

type ThemeState = { mode: ThemeMode; scheme: Scheme; setMode: (m: ThemeMode) => void };
const ThemeContext = createContext<ThemeState | null>(null);

/**
 * Modo claro/oscuro. Por defecto sigue al sistema; la elección se guarda en el teléfono.
 * Al cambiar, App.tsx vuelve a pintar el árbol (key={scheme}), igual que con el idioma.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => (v === 'light' || v === 'dark' || v === 'system' ? setModeState(v) : undefined))
      .catch(() => {});
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    AsyncStorage.setItem(KEY, m).catch(() => {});
  }, []);

  const scheme: Scheme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  applyScheme(scheme); // antes de pintar a los hijos, para que lean los tokens correctos

  const value = useMemo(() => ({ mode, scheme, setMode }), [mode, scheme, setMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
