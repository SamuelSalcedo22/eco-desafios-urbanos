import React from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Badge, Button, Icon, NeoBox, Text } from '../components/atoms';
import { EmptyState, PointsPill } from '../components/molecules';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { getMission } from '../content/missions';
import { CATEGORY_META } from '../content/categories';
import { missionText } from '../hooks/useLocale';
import { t } from '../i18n';
import { globalTokens as g, neoBorder } from '../design';
import type { RootStackParamList } from '../navigation/types';

export function MissionDetailScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'MissionDetail'>) {
  const mission = getMission(route.params.missionId);
  if (!mission) return <ScreenTemplate><EmptyState title={t('missions.empty')} /></ScreenTemplate>;

  const meta = CATEGORY_META[mission.category];
  const text = missionText(mission);

  return (
    <ScreenTemplate footer={<Button label={t('missions.start')} onPress={() => navigation.navigate('Evidence', { missionId: mission.id })} />}>
      <Text variant="label" onPress={() => navigation.goBack()} style={{ textDecorationLine: 'underline' }}>
        ← {t('common.back')}
      </Text>
      <NeoBox bg={meta.color} padding={g.spacing[5]} radius={g.radius.lg} offset={g.shadowOffset.lg}>
        <View style={{ gap: g.spacing[3] }}>
          <Icon name={meta.icon} size={44} />
          <Text variant="display">{text.title}</Text>
          <View style={{ flexDirection: 'row', gap: g.spacing[2], flexWrap: 'wrap' }}>
            <Badge label={t(`categories.${mission.category}`)} bg={g.color.cream[100]} />
            <PointsPill points={mission.points} bg={g.color.cream[100]} />
          </View>
        </View>
      </NeoBox>
      <Text variant="body">{text.summary}</Text>
      <Text variant="title">{t('missions.howTo')}</Text>
      {text.steps.map((step, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: g.spacing[3], alignItems: 'flex-start' }}>
          <View style={[neoBorder('thick'), { width: 36, height: 36, borderRadius: 18, backgroundColor: g.color.yellow[500], alignItems: 'center', justifyContent: 'center' }]}>
            <Text variant="label">{i + 1}</Text>
          </View>
          <Text variant="body" style={{ flex: 1, paddingTop: 4 }}>
            {step}
          </Text>
        </View>
      ))}
    </ScreenTemplate>
  );
}
