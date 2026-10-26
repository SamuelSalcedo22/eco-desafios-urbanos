import { globalTokens as g } from './global';
import { semanticTokens as s } from './semantic';

/**
 * Tokens de COMPONENTE (nivel 3): valores específicos de cada componente.
 * Ej.: button.primary.bg = action.primary
 */
export const componentTokens = {
  button: {
    primary: { bg: s.color.action.primary, text: g.color.ink[900] },
    secondary: { bg: s.color.action.secondary, text: g.color.ink[900] },
    dark: { bg: s.color.background.inverse, text: s.color.text.inverse },
    ghost: { bg: s.color.background.surface, text: g.color.ink[900] },
    minHeight: 54,
    paddingX: g.spacing[5],
  },
  input: {
    bg: s.color.background.surface,
    border: s.color.border.default,
    errorBorder: s.color.feedback.error,
    minHeight: 54,
  },
  card: {
    bg: s.color.background.surface,
    border: s.color.border.default,
    radius: g.radius.md,
    padding: g.spacing[4],
  },
  tabBar: {
    bg: s.color.background.surface,
    activeBg: s.color.action.secondary,
    height: 72,
  },
  badge: { bg: s.color.action.secondary, text: g.color.ink[900] },
} as const;

export type ComponentTokens = typeof componentTokens;
