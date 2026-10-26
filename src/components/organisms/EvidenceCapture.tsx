import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, NeoBox, Text } from '../atoms';
import { ErrorMessage } from '../molecules';
import { preparePhoto, PreparedPhoto } from '../../services/photo';
import { t } from '../../i18n';
import { toUserError, UserError } from '../../utils/errors';
import { globalTokens as g } from '../../design';
import { AppError } from '../../utils/errors';

type Props = {
  label: string;
  photo: PreparedPhoto | null;
  onCapture: (p: PreparedPhoto | null) => void;
};

/** Organismo: vista de cámara con permisos, captura, vista previa y repetir. */
export function EvidenceCapture({ label, photo, onCapture }: Props) {
  const camera = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UserError | null>(null);

  if (!permission) return <ActivityIndicator />;

  if (!permission.granted) {
    return (
      <View style={{ gap: g.spacing[3] }}>
        <ErrorMessage error={toUserError(new AppError('cameraDenied'))} />
        <Button label={permission.canAskAgain ? t('common.retry') : t('common.ok')} variant="secondary" onPress={() => (permission.canAskAgain ? requestPermission() : Linking.openSettings())} />
      </View>
    );
  }

  async function take() {
    if (!camera.current) return;
    setBusy(true);
    setError(null);
    try {
      const shot = await camera.current.takePictureAsync({ quality: 0.7, skipProcessing: true });
      onCapture(await preparePhoto(shot.uri));
    } catch (e) {
      setError(toUserError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={{ gap: g.spacing[3] }}>
      <Text variant="label">{label}</Text>
      <NeoBox padding={0} radius={g.radius.md} contentStyle={{ overflow: 'hidden', aspectRatio: 3 / 4 }}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={{ flex: 1 }} resizeMode="cover" accessibilityLabel={label} />
        ) : (
          <CameraView ref={camera} style={{ flex: 1 }} facing="back" />
        )}
      </NeoBox>
      {error ? <ErrorMessage error={error} /> : null}
      {photo ? (
        <Button label={t('evidence.retake')} variant="ghost" arrow={false} onPress={() => onCapture(null)} />
      ) : (
        <Button label={t('evidence.takePhoto')} loading={busy} onPress={take} variant="secondary" />
      )}
    </View>
  );
}
