import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '../components/atoms';
import { PointsPill } from '../components/molecules';
import { MissionList } from '../components/organisms/MissionList';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { api, isDemoMode } from '../services';
import { t } from '../i18n';
import { globalTokens as g } from '../design';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, 'Missions'>, NativeStackScreenProps<RootStackParamList>>;

export function MissionsScreen({ navigation }: Props) {
  const { user } = useAuth();
  const subs = useAsync(() => api.listSubmissions(user!.id), [user?.id]);
  const profile = useAsync(() => api.getProfile(user!.id), [user?.id]);

  useFocusEffect(
    useCallback(() => {
      subs.reload();
      profile.reload();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]),
  );

  const doneToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return new Set((subs.data ?? []).filter((s) => s.verdict === 'approved' && s.createdAt.startsWith(today)).map((s) => s.missionId));
  }, [subs.data]);

  return (
    <ScreenTemplate>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: g.spacing[3] }}>
        <Text variant="display" style={{ flex: 1 }} numberOfLines={2}>
          {t('missions.title')}
        </Text>
        <PointsPill points={profile.data?.totalPoints ?? 0} />
      </View>
      {isDemoMode ? <Text variant="caption">Modo demo: los datos se guardan solo en este teléfono.</Text> : null}
      {subs.error ? <ErrorBlock error={subs.error} onRetry={subs.reload} /> : null}
      <MissionList doneIds={doneToday} onOpen={(missionId) => navigation.navigate('MissionDetail', { missionId })} />
    </ScreenTemplate>
  );
}
