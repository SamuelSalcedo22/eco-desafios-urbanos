import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Badge, Button, Text } from '../components/atoms';
import { EmptyState } from '../components/molecules';
import { EvidenceCapture } from '../components/organisms/EvidenceCapture';
import { ErrorBlock } from '../components/organisms/ErrorBlock';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { getMission } from '../content/missions';
import { missionText } from '../hooks/useLocale';
import { api } from '../services';
import { getCoords, Coords } from '../services/location';
import type { PreparedPhoto } from '../services/photo';
import { t } from '../i18n';
import { toUserError, UserError } from '../utils/errors';
import { globalTokens as g } from '../design';
import type { RootStackParamList } from '../navigation/types';

export function EvidenceScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Evidence'>) {
  const mission = getMission(route.params.missionId);
  const slots = mission?.evidenceMode === 'before_after' ? 2 : 1;
  const [photos, setPhotos] = useState<(PreparedPhoto | null)[]>(Array(slots).fill(null));
  const [coords, setCoords] = useState<Coords | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<UserError | null>(null);

  useEffect(() => {
    getCoords().then(setCoords);
  }, []);

  if (!mission) return <ScreenTemplate><EmptyState title={t('missions.empty')} /></ScreenTemplate>;

  const ready = photos.every(Boolean);
  const labels = slots === 2 ? [t('evidence.before'), t('evidence.after')] : [t('evidence.title')];

  async function send() {
    setSending(true);
    setError(null);
    try {
      const result = await api.submitEvidence({
        missionId: mission!.id,
        images: photos.map((p) => p!.base64),
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      });
      navigation.replace('Result', result);
    } catch (e) {
      setError(toUserError(e));
    } finally {
      setSending(false);
    }
  }

  return (
    <ScreenTemplate
      footer={<Button label={sending ? t('evidence.checking') : t('evidence.send')} onPress={send} loading={sending} disabled={!ready} variant="dark" />}
    >
      <Text variant="label" onPress={() => navigation.goBack()} style={{ textDecorationLine: 'underline' }}>
        ← {t('common.back')}
      </Text>
      <Text variant="display">{missionText(mission).title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Badge label={coords ? t('evidence.locationOn') : t('evidence.locationOff')} bg={coords ? g.color.green[500] : g.color.cream[200]} />
      </View>
      {photos.map((photo, i) => (
        <EvidenceCapture key={i} label={labels[i]} photo={photo} onCapture={(p) => setPhotos((prev) => prev.map((x, idx) => (idx === i ? p : x)))} />
      ))}
      {error ? <ErrorBlock error={error} onRetry={send} /> : null}
    </ScreenTemplate>
  );
}
