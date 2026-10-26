import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Chip, Text } from '../components/atoms';
import { SectionHeader } from '../components/molecules';
import { ImpactSummary } from '../components/organisms/ImpactSummary';
import { HistoryList } from '../components/organisms/HistoryList';
import { RewardsRow } from '../components/organisms/RewardsRow';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { api } from '../services';
import { useLang } from '../context/LanguageContext';
import { t } from '../i18n';
import { globalTokens as g } from '../design';

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const profile = useAsync(() => api.getProfile(user!.id), [user?.id]);
  const history = useAsync(() => api.listSubmissions(user!.id), [user?.id]);

  useFocusEffect(useCallback(() => { profile.reload(); history.reload(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [user?.id]));

  const { lang, changeLang: change } = useLang();

  return (
    <ScreenTemplate>
      <Text variant="display">{t('profile.title')}</Text>
      <Text variant="subtitle">{profile.data?.name ?? user?.name}</Text>
      {profile.loading && !profile.data ? <ActivityIndicator /> : null}
      {profile.error ? <ErrorBlock error={profile.error} onRetry={profile.reload} /> : null}
      {profile.data ? <ImpactSummary profile={profile.data} /> : null}
      <SectionHeader title={t('profile.rewards')} />
      <RewardsRow points={profile.data?.totalPoints ?? 0} />
      <SectionHeader title={t('profile.history')} />
      {history.error ? <ErrorBlock error={history.error} onRetry={history.reload} /> : <HistoryList items={history.data ?? []} />}
      <SectionHeader title={t('profile.language')} />
      <View style={{ flexDirection: 'row', gap: g.spacing[2] }}>
        <Chip label="Español" selected={lang === 'es'} onPress={() => change('es')} />
        <Chip label="English" selected={lang === 'en'} onPress={() => change('en')} />
      </View>
      <Button label={t('auth.logout')} onPress={signOut} variant="ghost" arrow={false} />
    </ScreenTemplate>
  );
}
