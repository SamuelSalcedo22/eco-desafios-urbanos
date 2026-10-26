import React from 'react';
import { View } from 'react-native';
import { NeoBox, Text } from '../atoms';
import { PointsPill } from '../molecules';
import { t } from '../../i18n';
import { globalTokens as g } from '../../design';
import type { RankingEntry } from '../../types';

const PODIUM = [g.color.yellow[400], g.color.cream[200], g.color.pink[500]];

export function RankingList({ entries, meId }: { entries: RankingEntry[]; meId?: string }) {
  return (
    <View style={{ gap: g.spacing[3] }}>
      {entries.map((e, i) => {
        const mine = e.id === meId;
        return (
          <NeoBox key={e.id} bg={mine ? g.color.blue[500] + '33' : g.color.white} padding={g.spacing[3]} offset={g.shadowOffset.sm} radius={g.radius.sm}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: g.spacing[3] }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: g.border.thick, borderColor: g.color.ink[900], backgroundColor: PODIUM[i] ?? g.color.white, alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="label">{i + 1}</Text>
              </View>
              <Text variant="subtitle" style={{ flex: 1 }} numberOfLines={1}>
                {mine ? `${e.name} (${t('ranking.you')})` : e.name}
              </Text>
              <PointsPill points={e.points} />
            </View>
          </NeoBox>
        );
      })}
    </View>
  );
}
