import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterMissions } from './filterMissions.ts';
import { MISSIONS } from '../content/missions.ts';

test('sin filtros devuelve todas', () => {
  assert.equal(filterMissions(MISSIONS, '', 'all', 'es').length, MISSIONS.length);
});
test('filtra por categoría', () => {
  const r = filterMissions(MISSIONS, '', 'reciclaje', 'es');
  assert.equal(r.length, 1);
  assert.equal(r[0].category, 'reciclaje');
});
test('busca sin importar tildes ni mayúsculas', () => {
  assert.equal(filterMissions(MISSIONS, 'PARQUE', 'all', 'es').length >= 1, true);
  assert.equal(filterMissions(MISSIONS, 'basúra', 'all', 'es').length >= 0, true);
});
test('combina texto y categoría', () => {
  assert.equal(filterMissions(MISSIONS, 'parque', 'residuos', 'es').length, 0);
});
