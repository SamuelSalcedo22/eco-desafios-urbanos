import { Platform, ViewStyle } from 'react-native';
import { globalTokens as g } from './tokens/global';

/** Sombra sólida desplazada, firma del Neo-Brutalism (sin blur). */
export function hardShadow(size: keyof typeof g.shadowOffset = 'md'): ViewStyle {
  const o = g.shadowOffset[size];
  return Platform.select<ViewStyle>({
    ios: {
      shadowColor: g.color.ink[900],
      shadowOffset: { width: o, height: o },
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    default: {},
  }) as ViewStyle;
}

/** Borde grueso negro estándar. */
export function neoBorder(width: keyof typeof g.border = 'thick'): ViewStyle {
  return { borderWidth: g.border[width], borderColor: g.color.ink[900] };
}
