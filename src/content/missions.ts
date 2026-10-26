import type { Mission } from '../types';

/**
 * Catálogo inicial: 4 tipos de misión (la ficha recomienda empezar con 3-5).
 * El contenido real va primero; el diseño se adapta a él, no al revés.
 */
export const MISSIONS: Mission[] = [
  {
    id: 'm-parque-limpieza',
    category: 'parque',
    title: { es: 'Limpia un parque', en: 'Clean up a park' },
    summary: {
      es: 'Recoge la basura de una zona de un parque y muéstranos cómo quedó.',
      en: 'Pick up trash in one area of a park and show us how it looks now.',
    },
    steps: {
      es: ['Elige una zona del parque con basura.', 'Toma una foto de ANTES.', 'Recoge y deposita todo en una caneca.', 'Toma una foto de DESPUÉS desde el mismo lugar.'],
      en: ['Pick an area of the park with litter.', 'Take a BEFORE photo.', 'Collect it all and put it in a bin.', 'Take an AFTER photo from the same spot.'],
    },
    points: 50,
    evidenceMode: 'before_after',
    visionHint: 'Dos fotos del mismo lugar en un parque o zona pública: la primera con basura visible y la segunda con la zona notablemente más limpia.',
  },
  {
    id: 'm-reciclaje-punto',
    category: 'reciclaje',
    title: { es: 'Encuentra un punto de reciclaje', en: 'Find a recycling point' },
    summary: {
      es: 'Ubica un punto de reciclaje cerca de ti y regístralo con una foto.',
      en: 'Locate a recycling point near you and log it with a photo.',
    },
    steps: {
      es: ['Busca un punto o contenedor de reciclaje.', 'Párate frente a él.', 'Toma una foto donde se vea el contenedor o su señal.'],
      en: ['Look for a recycling point or bin.', 'Stand in front of it.', 'Take a photo showing the bin or its sign.'],
    },
    points: 30,
    evidenceMode: 'single',
    visionHint: 'Un contenedor, caneca o estación de reciclaje claramente visible, con colores o símbolos de separación de residuos.',
  },
  {
    id: 'm-deterioro-reporte',
    category: 'deterioro',
    title: { es: 'Reporta un espacio deteriorado', en: 'Report a damaged space' },
    summary: {
      es: 'Registra un espacio público en mal estado para que la comunidad lo conozca.',
      en: 'Log a run-down public space so the community knows about it.',
    },
    steps: {
      es: ['Encuentra un espacio público deteriorado.', 'Toma una foto donde se vea el daño.', 'Mantén la ubicación activa para marcarlo en el mapa.'],
      en: ['Find a damaged public space.', 'Take a photo showing the damage.', 'Keep location on so it can be pinned on the map.'],
    },
    points: 40,
    evidenceMode: 'single',
    visionHint: 'Un espacio público con deterioro visible: basura acumulada, grafiti, mobiliario roto, andén dañado o zona abandonada.',
  },
  {
    id: 'm-residuos-separar',
    category: 'residuos',
    title: { es: 'Separa tus residuos', en: 'Sort your waste' },
    summary: {
      es: 'Separa residuos en aprovechables y no aprovechables y muéstralo.',
      en: 'Sort waste into recyclable and non-recyclable and show it.',
    },
    steps: {
      es: ['Reúne los residuos de un día.', 'Sepáralos en bolsas o recipientes distintos.', 'Toma una foto donde se vean los grupos separados.'],
      en: ['Gather a day of waste.', 'Sort it into different bags or containers.', 'Take a photo showing the separated groups.'],
    },
    points: 25,
    evidenceMode: 'single',
    visionHint: 'Residuos separados en al menos dos grupos o recipientes distintos (por ejemplo plástico, papel, orgánico).',
  },
];

export function getMission(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
