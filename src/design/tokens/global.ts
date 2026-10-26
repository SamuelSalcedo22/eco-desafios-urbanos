/**
 * Tokens GLOBALES (nivel 1): valores crudos, sin significado de interfaz.
 * Paleta "Retro" + base Neo-Brutalist (crema, tinta negra).
 */
export const globalTokens = {
  color: {
    cream: { 50: '#FFFDF9', 100: '#FBF7F0', 200: '#F2EBDD' },
    ink: { 900: '#0F0F0F', 700: '#2B2B2B', 500: '#6B6B6B', 300: '#B8B2A7' },
    yellow: { 500: '#FFC567', 400: '#FFD21F' },
    pink: { 500: '#FB7DA8' },
    red: { 500: '#FD5A46' },
    purple: { 500: '#552CB7' },
    green: { 500: '#00995E' },
    blue: { 500: '#058CD7' },
    white: '#FFFFFF',
  },
  spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48 },
  radius: { none: 0, sm: 8, md: 14, lg: 20, pill: 999 },
  border: { thin: 2, thick: 3, heavy: 4 },
  shadowOffset: { sm: 3, md: 5, lg: 8 },
  fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 26, '2xl': 34, '3xl': 44 },
  lineHeight: { tight: 1.05, normal: 1.35 },
  fontFamily: {
    display: 'ArchivoBlack_400Regular',
    body: 'SpaceGrotesk_500Medium',
    bodyBold: 'SpaceGrotesk_700Bold',
  },
} as const;

export type GlobalTokens = typeof globalTokens;
