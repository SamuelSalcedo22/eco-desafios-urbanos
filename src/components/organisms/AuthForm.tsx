import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from '../atoms';
import { FormField } from '../molecules';
import { ErrorBlock } from './ErrorBlock';
import { t } from '../../i18n';
import { toUserError, UserError } from '../../utils/errors';
import { globalTokens as g } from '../../design';

type Props = {
  mode: 'login' | 'register';
  onSubmit: (v: { email: string; password: string; name: string }) => Promise<void>;
  onSwitch: () => void;
};

export function AuthForm({ mode, onSubmit, onSwitch }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<UserError | null>(null);
  const register = mode === 'register';

  const canSend = email.includes('@') && password.length > 0 && (!register || name.trim().length > 0);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      await onSubmit({ email, password, name });
    } catch (e) {
      setError(toUserError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={{ gap: g.spacing[4] }}>
      {register ? <FormField label={t('auth.name')} value={name} onChangeText={setName} autoCapitalize="words" textContentType="name" /> : null}
      <FormField label={t('auth.email')} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoCorrect={false} textContentType="emailAddress" />
      <FormField label={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" textContentType={register ? 'newPassword' : 'password'} />
      {error ? <ErrorBlock error={error} /> : null}
      <Button label={register ? t('auth.register') : t('auth.login')} onPress={submit} loading={busy} disabled={!canSend} />
      <Text variant="label" onPress={onSwitch} style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
        {register ? t('auth.toLogin') : t('auth.toRegister')}
      </Text>
    </View>
  );
}
