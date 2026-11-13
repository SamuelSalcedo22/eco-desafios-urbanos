/**
 * Tokens de MOVIMIENTO: duraciones, resortes y escalonado.
 * Un solo lugar para el "carácter" de las animaciones: rápidas, con rebote corto,
 * como bloques físicos que caen y chocan (Neo-Brutalism).
 */
export const motionTokens = {
  duration: { fast: 160, base: 260, slow: 420, intro: 1900 },
  spring: {
    /** Rebote marcado: bloques que caen. */
    bouncy: { damping: 11, stiffness: 180, mass: 0.9 },
    /** Firme: entrada de tarjetas y textos. */
    snappy: { damping: 16, stiffness: 220, mass: 0.8 },
  },
  /** Retraso entre elementos de una lista (cascada). */
  stagger: 70,
  /** Tope para que listas largas no tarden en aparecer. */
  maxStaggerItems: 8,
} as const;
