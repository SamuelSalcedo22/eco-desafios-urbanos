import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Badge, Text } from '../components/atoms';
import { EmptyState } from '../components/molecules';
import { ActivityMap } from '../components/organisms/ActivityMap';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAsync } from '../hooks/useAsync';
import { api } from '../services';
import { getCoords } from '../services/location';
import { CATEGORY_META, CATEGORY_ORDER } from '../content/categories';
import { t } from '../i18n';
import { globalTokens as g } from '../design';

// Centro por defecto: Pasto, Nariño
const DEFAULT_CENTER = { latitude: 1.2136, longitude: -77.2811 };

export function MapScreen() {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const activities = useAsync(() => api.getMapActivities(), []);

  useEffect(() => {
    getCoords().then((c) => c && setCenter(c));
  }, []);
  useFocusEffect(useCallback(() => { activities.reload(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []));

  return (
    <ScreenTemplate>
      <Text variant="display">{t('map.title')}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: g.spacing[2] }}>
        {CATEGORY_ORDER.map((c) => (
          <Badge key={c} label={t(`categories.${c}`)} bg={CATEGORY_META[c].color} />
        ))}
      </View>
      {activities.loading && !activities.data ? <ActivityIndicator /> : null}
      {activities.error ? <ErrorBlock error={activities.error} onRetry={activities.reload} /> : null}
      {activities.data && activities.data.length === 0 ? <EmptyState title={t('map.empty')} icon="map-outline" /> : null}
      {activities.data && activities.data.length > 0 ? <ActivityMap activities={activities.data} center={center} /> : null}
    </ScreenTemplate>
  );
}
