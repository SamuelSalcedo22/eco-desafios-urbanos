import React from 'react';
import { TextInputProps, View } from 'react-native';
import { Input, Text } from '../atoms';
import { globalTokens as g, semanticTokens as s } from '../../design';

type Props = TextInputProps & { label: string; error?: string };

export function FormField({ label, error, ...input }: Props) {
  return (
    <View style={{ gap: g.spacing[2] }}>
      <Text variant="label">{label}</Text>
      <Input {...input} invalid={!!error} accessibilityLabel={label} />
      {error ? (
        <Text variant="caption" color={s.color.feedback.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
