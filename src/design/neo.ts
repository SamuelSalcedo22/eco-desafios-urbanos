import { ViewStyle } from 'react-native';
import { globalTokens as g } from './tokens/global';
import { semanticTokens as s } from './tokens/semantic';

/** Borde grueso estándar del estilo Neo-Brutalist (tinta en claro, crema en oscuro). */
export function neoBorder(width: keyof typeof g.border = 'thick'): ViewStyle {
  return { borderWidth: g.border[width], borderColor: s.color.border.default };
}
