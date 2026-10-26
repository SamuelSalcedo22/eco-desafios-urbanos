import React from 'react';
import { View } from 'react-native';
import { StatTile } from '../molecules';
import { t } from '../../i18n';
import { globalTokens as g } from '../../design';
import type { Profile } from '../../types';

export function ImpactSummary({ profile }: { profile: Profile }) {
  return (
    <View style={{ flexDirection: 'row', gap: g.spacing[4] }}>
      <StatTile label={t('profile.totalPoints')} value={profile.totalPoints} bg={g.color.yellow[500]} />
      <StatTile label={t('profile.missionsDone')} value={profile.missionsDone} bg={g.color.green[500]} />
    </View>
  );
}
