import React, { useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, NeoBox, Text } from '../components/atoms';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { t, i18n } from '../i18n';
import { globalTokens as g } from '../design';
import type { RootStackParamList } from '../navigation/types';

export const ONBOARDING_KEY = 'onboarding:seen';

const SLIDE_STYLE = [
  { bg: g.color.yellow[500], icon: 'leaf' as const },
  { bg: g.color.pink[500], icon: 'camera' as const },
  { bg: g.color.blue[500], icon: 'trophy' as const },
];

export function OnboardingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  const [index, setIndex] = useState(0);
  const slides = i18n.t('onboarding.slides') as unknown as { title: string; body: string }[];
  const last = index === slides.length - 1;

  async function finish() {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    } catch {
      // si no se puede guardar, igual seguimos
    }
    navigation.replace('Login');
  }

  return (
    <ScreenTemplate
      scroll={false}
      footer={
        <View style={{ gap: g.spacing[3] }}>
          <Button label={last ? t('onboarding.start') : t('onboarding.next')} onPress={last ? finish : () => setIndex(index + 1)} variant="dark" />
          {!last ? (
            <Text variant="label" onPress={finish} style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
              {t('onboarding.skip')}
            </Text>
          ) : null}
        </View>
      }
    >
      <View style={{ flex: 1, justifyContent: 'center', gap: g.spacing[6] }}>
        <NeoBox bg={SLIDE_STYLE[index].bg} padding={g.spacing[6]} offset={g.shadowOffset.lg} radius={g.radius.lg} contentStyle={{ alignItems: 'center', gap: g.spacing[4], minHeight: 240, justifyContent: 'center' }}>
          <Icon name={SLIDE_STYLE[index].icon} size={84} />
        </NeoBox>
        <View style={{ gap: g.spacing[3] }}>
          <Text variant="display">{slides[index].title}</Text>
          <Text variant="body">{slides[index].body}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: g.spacing[2] }}>
          {slides.map((_, i) => (
            <View key={i} style={{ width: i === index ? 28 : 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: g.color.ink[900], backgroundColor: i === index ? g.color.ink[900] : 'transparent' }} />
          ))}
        </View>
      </View>
    </ScreenTemplate>
  );
}
