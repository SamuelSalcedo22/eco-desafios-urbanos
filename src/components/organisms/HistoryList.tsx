import React from 'react';
import { View } from 'react-native';
import { Badge, NeoBox, Text } from '../atoms';
import { EmptyState } from '../molecules';
import { getMission } from '../../content/missions';
import { missionText } from '../../hooks/useLocale';
import { t, getLanguage } from '../../i18n';
import { globalTokens as g } from '../../design';
import type { Submission } from '../../types';

const VERDICT_BG = { approved: g.color.green[500], review: g.color.yellow[500], rejected: g.color.pink[500] };

export function HistoryList({ items }: { items: Submission[] }) {
  if (items.length === 0) return <EmptyState title={t('profile.historyEmpty')} icon="time-outline" />;
  const locale = getLanguage() === 'en' ? 'en-US' : 'es-CO';
  return (
    <View style={{ gap: g.spacing[3] }}>
      {items.map((s) => {
        const mission = getMission(s.missionId);
        return (
          <NeoBox key={s.id} padding={g.spacing[3]} offset={g.shadowOffset.sm} radius={g.radius.sm}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: g.spacing[3] }}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="subtitle" numberOfLines={2}>
                  {mission ? missionText(mission).title : s.missionId}
                </Text>
                <Text variant="caption">{new Date(s.createdAt).toLocaleDateString(locale)}</Text>
              </View>
              <Badge label={s.verdict === 'approved' ? `+${s.pointsAwarded}` : s.verdict === 'review' ? '…' : '✕'} bg={VERDICT_BG[s.verdict]} />
            </View>
          </NeoBox>
        );
      })}
    </View>
  );
}
