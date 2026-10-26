import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decideVerdict, isValidCoordinate } from './verdict.ts';

test('aprueba con alta confianza y ubicación', () => {
  assert.equal(decideVerdict({ matches: true, confidence: 0.9, reason: '' }, true, true), 'approved');
});
test('pasa a revisión si falta la ubicación requerida', () => {
  assert.equal(decideVerdict({ matches: true, confidence: 0.9, reason: '' }, true, false), 'review');
});
test('aprueba sin ubicación si la misión no la exige', () => {
  assert.equal(decideVerdict({ matches: true, confidence: 0.8, reason: '' }, false, false), 'approved');
});
test('confianza media va a revisión', () => {
  assert.equal(decideVerdict({ matches: true, confidence: 0.6, reason: '' }, false, true), 'review');
});
test('rechaza si no coincide o la confianza es baja', () => {
  assert.equal(decideVerdict({ matches: false, confidence: 0.95, reason: '' }, false, true), 'rejected');
  assert.equal(decideVerdict({ matches: true, confidence: 0.2, reason: '' }, false, true), 'rejected');
});
test('valida coordenadas', () => {
  assert.equal(isValidCoordinate(1.2136, -77.2811), true);
  assert.equal(isValidCoordinate(200, 0), false);
  assert.equal(isValidCoordinate('1', '2'), false);
  assert.equal(isValidCoordinate(NaN, 0), false);
});
