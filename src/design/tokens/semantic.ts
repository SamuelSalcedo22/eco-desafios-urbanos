import { globalTokens as g } from './global';

/**
 * Tokens SEMÁNTICOS (nivel 2): dan propósito de UI a los valores globales.
 * Hay dos esquemas (claro y oscuro). Los componentes solo leen `semanticTokens`;
 * al cambiar de modo se copian aquí los valores del esquema activo (ver design/theme.ts).
 *
 * Modo oscuro Neo-Brutalist: fondo casi negro cálido, y las líneas y sombras duras
 * pasan de tinta negra a crema. Los colores Retro de acción y categoría NO cambian.
 */
export type SchemeColors = {
  background: { primary: string; surface: string; muted: string; inverse: string };
  text: { primary: string; secondary: string; inverse: string };
  border: { default: string };
  shadow: string;
};

export const schemes: Record<'light' | 'dark', SchemeColors> = {
  light: {
    background: { primary: g.color.cream[100], surface: g.color.white, muted: g.color.cream[200], inverse: g.color.ink[900] },
    text: { primary: g.color.ink[900], secondary: g.color.ink[500], inverse: g.color.cream[50] },
    border: { default: g.color.ink[900] },
    shadow: g.color.ink[900],
  },
  dark: {
    background: { primary: g.color.night[950], surface: g.color.night[900], muted: g.color.night[800], inverse: g.color.cream[100] },
    text: { primary: g.color.cream[100], secondary: g.color.night[400], inverse: g.color.ink[900] },
    border: { default: g.color.cream[200] },
    shadow: g.color.cream[200],
  },
};

export const semanticTokens = {
  color: {
    ...structuredCloneScheme(schemes.light),
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
    },
  },
  space: {
    screenPadding: g.spacing[5],
    stack: g.spacing[4],
    inline: g.spacing[3],
  },
};

function structuredCloneScheme(c: SchemeColors): SchemeColors {
  return { background: { ...c.background }, text: { ...c.text }, border: { ...c.border }, shadow: c.shadow };
}

export type SemanticTokens = typeof semanticTokens;
