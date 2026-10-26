import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Text } from '../components/atoms';
import { EmptyState } from '../components/molecules';
import { RankingList } from '../components/organisms/RankingList';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { api } from '../services';
import { t } from '../i18n';

export function RankingScreen() {
  const { user } = useAuth();
  const ranking = useAsync(() => api.getRanking(), []);
  useFocusEffect(useCallback(() => { ranking.reload(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []));

  return (
    <ScreenTemplate>
      <Text variant="display">{t('ranking.title')}</Text>
      {ranking.loading && !ranking.data ? <ActivityIndicator /> : null}
      {ranking.error ? <ErrorBlock error={ranking.error} onRetry={ranking.reload} /> : null}
      {ranking.data && ranking.data.length === 0 ? <EmptyState title={t('ranking.empty')} icon="trophy-outline" /> : null}
      {ranking.data ? <RankingList entries={ranking.data} meId={user?.id} /> : null}
    </ScreenTemplate>
  );
}
