import React from 'react';
import { View } from 'react-native';
import { Icon, NeoBox, Text } from '../atoms';
import { REWARDS, nextReward, unlockedRewards } from '../../content/rewards';
import { t } from '../../i18n';
import { globalTokens as g } from '../../design';

export function RewardsRow({ points }: { points: number }) {
  const unlocked = new Set(unlockedRewards(points).map((r) => r.id));
  const next = nextReward(points);
  return (
    <View style={{ gap: g.spacing[3] }}>
      <View style={{ flexDirection: 'row', gap: g.spacing[3] }}>
        {REWARDS.map((r) => {
          const on = unlocked.has(r.id);
          return (
            <NeoBox key={r.id} bg={on ? r.color : g.color.cream[200]} offset={g.shadowOffset.sm} radius={g.radius.sm} padding={g.spacing[3]} style={{ flex: 1 }} contentStyle={{ alignItems: 'center', gap: g.spacing[1], opacity: on ? 1 : 0.55 }}>
              <Icon name={on ? 'ribbon' : 'lock-closed'} size={30} />
              <Text variant="label" numberOfLines={1} adjustsFontSizeToFit>
                {t(`rewards.${r.id}`)}
              </Text>
            </NeoBox>
          );
        })}
      </View>
      <Text variant="caption">{next ? t('rewards.next', { name: t(`rewards.${next.id}`), points: next.minPoints }) : t('rewards.all')}</Text>
    </View>
  );
}
