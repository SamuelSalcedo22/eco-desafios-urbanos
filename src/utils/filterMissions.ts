import type { Mission, MissionCategory } from '../types';

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Búsqueda por filtrado: texto (sin tildes ni mayúsculas) + categoría (faceta). */
export function filterMissions(
  missions: Mission[],
  query: string,
  category: MissionCategory | 'all',
  lang: 'es' | 'en',
): Mission[] {
  const q = normalize(query);
  return missions.filter((m) => {
    if (category !== 'all' && m.category !== category) return false;
    if (!q) return true;
    return normalize(`${m.title[lang]} ${m.summary[lang]}`).includes(q);
  });
}
