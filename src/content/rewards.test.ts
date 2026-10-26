import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextReward, unlockedRewards } from './rewards.ts';

test('sin puntos no hay insignias y la siguiente es la primera', () => {
  assert.equal(unlockedRewards(0).length, 0);
  assert.equal(nextReward(0)?.id, 'sprout');
});
test('desbloquea al llegar exactamente al mínimo', () => {
  assert.deepEqual(unlockedRewards(150).map((r) => r.id), ['sprout', 'sapling']);
});
test('con todos los puntos ya no hay siguiente', () => {
  assert.equal(unlockedRewards(999).length, 3);
  assert.equal(nextReward(999), null);
});
