import { globalTokens as g } from './global';

/**
 * Tokens SEMÁNTICOS (nivel 2): dan propósito de UI a los valores globales.
 * Ej.: background.primary = cream.100
 */
export const semanticTokens = {
  color: {
    background: {
      primary: g.color.cream[100],
      surface: g.color.white,
      muted: g.color.cream[200],
      inverse: g.color.ink[900],
    },
    text: {
      primary: g.color.ink[900],
      secondary: g.color.ink[500],
      inverse: g.color.cream[50],
    },
    border: { default: g.color.ink[900] },
    action: {
      primary: g.color.red[500],
      secondary: g.color.yellow[500],
      accent: g.color.purple[500],
    },
    feedback: {
      success: g.color.green[500],
      warning: g.color.yellow[400],
      error: g.color.red[500],
      info: g.color.blue[500],
    },
    category: {
      parque: g.color.green[500],
      reciclaje: g.color.blue[500],
      deterioro: g.color.pink[500],
      residuos: g.color.yellow[500],
      comunidad: g.color.purple[500],
    },
  },
  space: {
    screenPadding: g.spacing[5],
    stack: g.spacing[4],
    inline: g.spacing[3],
  },
} as const;

export type SemanticTokens = typeof semanticTokens;
