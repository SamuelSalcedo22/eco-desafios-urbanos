export type RewardId = 'sprout' | 'sapling' | 'tree';

export type Reward = { id: RewardId; minPoints: number; color: string };

/** Insignias por puntos acumulados (recompensas de la ficha del proyecto). */
export const REWARDS: Reward[] = [
  { id: 'sprout', minPoints: 50, color: '#FFC567' },
  { id: 'sapling', minPoints: 150, color: '#FB7DA8' },
  { id: 'tree', minPoints: 300, color: '#00995E' },
];

export function unlockedRewards(points: number): Reward[] {
  return REWARDS.filter((r) => points >= r.minPoints);
}

/** Siguiente insignia por ganar, o null si ya tiene todas. */
export function nextReward(points: number): Reward | null {
  return REWARDS.find((r) => points < r.minPoints) ?? null;
}
