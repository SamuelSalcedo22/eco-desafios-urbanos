import React from 'react';
import { View } from 'react-native';
import { ErrorMessage } from '../molecules';
import { Button } from '../atoms';
import { t } from '../../i18n';
import { globalTokens as g } from '../../design';
import type { UserError } from '../../utils/errors';

export function ErrorBlock({ error, onRetry }: { error: UserError; onRetry?: () => void }) {
  return (
    <View style={{ gap: g.spacing[4] }}>
      <ErrorMessage error={error} />
      {onRetry ? <Button label={t('common.retry')} onPress={onRetry} variant="secondary" /> : null}
    </View>
  );
}
