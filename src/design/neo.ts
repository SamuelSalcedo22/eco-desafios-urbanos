import { ViewStyle } from 'react-native';
import { globalTokens as g } from './tokens/global';

/** Borde grueso negro estándar del estilo Neo-Brutalist. */
export function neoBorder(width: keyof typeof g.border = 'thick'): ViewStyle {
  return { borderWidth: g.border[width], borderColor: g.color.ink[900] };
}
