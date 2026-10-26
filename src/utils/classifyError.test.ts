import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AppError, classifyError } from './classifyError.ts';

test('respeta las claves propias de la app', () => {
  assert.equal(classifyError(new AppError('cameraDenied')), 'cameraDenied');
});
test('traduce errores técnicos de autenticación', () => {
  assert.equal(classifyError(new Error('Invalid login credentials')), 'credentials');
  assert.equal(classifyError(new Error('User already registered')), 'emailTaken');
  assert.equal(classifyError(new Error('Password should be at least 6 characters')), 'weakPassword');
  assert.equal(classifyError(new Error('JWT expired')), 'session');
});
test('detecta fallas de red', () => {
  assert.equal(classifyError(new Error('Network request failed')), 'network');
});
test('lo desconocido nunca expone el mensaje técnico', () => {
  assert.equal(classifyError(new Error('PGRST301 relation does not exist')), 'unknown');
  assert.equal(classifyError(undefined), 'unknown');
});
