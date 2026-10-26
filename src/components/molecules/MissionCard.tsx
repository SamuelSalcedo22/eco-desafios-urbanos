import React from 'react';
import { View } from 'react-native';
import { NeoBox, Text, Icon } from '../atoms';
import { PointsPill } from './PointsPill';
import { CATEGORY_META } from '../../content/categories';
import { missionText } from '../../hooks/useLocale';
import { t } from '../../i18n';
import { globalTokens as g, neoBorder } from '../../design';
import type { Mission } from '../../types';

type Props = { mission: Mission; done?: boolean; onPress: () => void };

/** Tarjeta con forma de carpeta: pestaña de color arriba + cuerpo blanco. */
export function MissionCard({ mission, done, onPress }: Props) {
  const meta = CATEGORY_META[mission.category];
  const text = missionText(mission);
  return (
    <View style={{ paddingTop: 14 }}>
      <View
        style={[
          neoBorder('thick'),
          { position: 'absolute', top: 0, left: 14, width: 64, height: 22, backgroundColor: meta.color, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth: 0 },
        ]}
      />
      <NeoBox onPress={onPress} padding={g.spacing[4]} accessibilityLabel={text.title}>
        <View style={{ flexDirection: 'row', gap: g.spacing[3], alignItems: 'center' }}>
          <View style={[neoBorder('thick'), { width: 56, height: 56, borderRadius: g.radius.sm, backgroundColor: meta.color, alignItems: 'center', justifyContent: 'center' }]}>
            <Icon name={done ? 'checkmark' : meta.icon} size={28} />
          </View>
          <View style={{ flex: 1, gap: g.spacing[1] }}>
            <Text variant="subtitle" numberOfLines={2}>
              {text.title}
            </Text>
            <Text variant="caption" numberOfLines={1}>
              {t(`categories.${mission.category}`)}
            </Text>
          </View>
          {done ? <Text variant="label">{t('missions.done')}</Text> : <PointsPill points={mission.points} />}
        </View>
      </NeoBox>
    </View>
  );
}
