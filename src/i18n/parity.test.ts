import { test } from 'node:test';
import assert from 'node:assert/strict';
import { es } from './es.ts';
import { en } from './en.ts';

function keys(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) return obj.flatMap((v, i) => keys(v, `${prefix}[${i}]`));
  if (obj && typeof obj === 'object') {
    return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

test('español e inglés tienen exactamente las mismas claves', () => {
  assert.deepEqual(keys(es).sort(), keys(en).sort());
});

test('todo error tiene "qué pasó" y "qué hacer" (y nunca códigos técnicos)', () => {
  for (const lang of [es, en]) {
    for (const [name, err] of Object.entries(lang.errors)) {
      assert.ok(err.what.length > 0, `${name}.what vacío`);
      assert.ok(err.action.length > 0, `${name}.action vacío`);
      assert.doesNotMatch(JSON.stringify(err), /token|payload|exception|PGRST|500|401/i, `${name} expone lenguaje técnico`);
    }
  }
});
