import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '../components/atoms';
import { AuthForm } from '../components/organisms/AuthForm';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAuth } from '../context/AuthContext';
import { t } from '../i18n';
import type { RootStackParamList } from '../navigation/types';

export function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const { signIn } = useAuth();
  return (
    <ScreenTemplate>
      <Text variant="display">{t('auth.loginTitle')}</Text>
      <Text variant="body">{t('auth.loginSubtitle')}</Text>
      <AuthForm mode="login" onSubmit={({ email, password }) => signIn(email, password)} onSwitch={() => navigation.navigate('Register')} />
    </ScreenTemplate>
  );
}
