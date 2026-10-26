import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '../components/atoms';
import { AuthForm } from '../components/organisms/AuthForm';
import { ScreenTemplate } from '../templates/ScreenTemplate';
import { useAuth } from '../context/AuthContext';
import { t } from '../i18n';
import type { RootStackParamList } from '../navigation/types';

export function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Register'>) {
  const { signUp } = useAuth();
  return (
    <ScreenTemplate>
      <Text variant="display">{t('auth.registerTitle')}</Text>
      <Text variant="body">{t('auth.registerSubtitle')}</Text>
      <AuthForm mode="register" onSubmit={({ email, password, name }) => signUp(email, password, name)} onSwitch={() => navigation.navigate('Login')} />
    </ScreenTemplate>
  );
}
