import React from 'react';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, NeoBox, Text } from '../components/atoms';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { t } from '../i18n';
import { globalTokens as g } from '../design';
import type { RootStackParamList } from '../navigation/types';

const STYLE = {
  approved: { bg: g.color.green[500], icon: 'checkmark-circle' as const, title: 'evidence.approvedTitle', body: 'evidence.approvedBody' },
  review: { bg: g.color.yellow[500], icon: 'time' as const, title: 'evidence.reviewTitle', body: 'evidence.reviewBody' },
  rejected: { bg: g.color.pink[500], icon: 'close-circle' as const, title: 'evidence.rejectedTitle', body: 'evidence.rejectedBody' },
};

export function ResultScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Result'>) {
  const { verdict, points, reason } = route.params;
  const s = STYLE[verdict];

  React.useEffect(() => {
    Haptics.notificationAsync(verdict === 'approved' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning).catch(() => {});
  }, [verdict]);

  return (
    <ScreenTemplate scroll={false} footer={<Button label={t('common.continue')} onPress={() => navigation.popToTop()} variant="dark" />}>
      <View style={{ flex: 1, justifyContent: 'center', gap: g.spacing[5] }}>
        <NeoBox bg={s.bg} padding={g.spacing[6]} radius={g.radius.lg} offset={g.shadowOffset.lg} contentStyle={{ alignItems: 'center', gap: g.spacing[3] }}>
          <Icon name={s.icon} size={96} />
          {verdict === 'approved' ? <Text variant="display">+{points}</Text> : null}
        </NeoBox>
        <Text variant="display">{t(s.title)}</Text>
        <Text variant="body">{t(s.body, { points })}</Text>
        {reason ? <Text variant="caption">{reason}</Text> : null}
      </View>
    </ScreenTemplate>
  );
}
