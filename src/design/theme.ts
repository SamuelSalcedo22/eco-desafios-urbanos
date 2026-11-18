import { globalTokens as g } from './tokens/global';
import { schemes, semanticTokens } from './tokens/semantic';
import { buildComponentTokens, componentTokens } from './tokens/component';

export type Scheme = 'light' | 'dark';
let current: Scheme = 'light';

/** Copia el esquema elegido en los tokens vivos. El árbol se vuelve a pintar con key={scheme}. */
export function applyScheme(scheme: Scheme) {
  if (scheme === current) return;
  current = scheme;
  const c = schemes[scheme];
  Object.assign(semanticTokens.color.background, c.background);
  Object.assign(semanticTokens.color.text, c.text);
  Object.assign(semanticTokens.color.border, c.border);
  semanticTokens.color.shadow = c.shadow;
  Object.assign(componentTokens, buildComponentTokens());
}

export const getScheme = () => current;

function luminance(hex: string): number | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/**
 * Color de texto e iconos que contrasta con un fondo dado.
 * Colores Retro (amarillo, rosado, verde, azul…) → tinta negra en ambos modos;
 * fondos oscuros (superficies nocturnas, morado) → crema. Fondos translúcidos → texto del tema.
 */
export function contentOn(bg: string | undefined): string {
  const l = bg ? luminance(bg) : null;
  if (l === null) return semanticTokens.color.text.primary;
  return l > 0.18 ? g.color.ink[900] : g.color.cream[100];
}
