import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '../atoms';
import { globalTokens as g } from '../../design';

type Props = { title: string; hint?: string; icon?: React.ComponentProps<typeof Icon>['name'] };

export function EmptyState({ title, hint, icon = 'leaf-outline' }: Props) {
  return (
    <View style={{ alignItems: 'center', gap: g.spacing[2], padding: g.spacing[8] }}>
      <Icon name={icon} size={44} />
      <Text variant="subtitle" style={{ textAlign: 'center' }}>
        {title}
      </Text>
      {hint ? (
        <Text variant="body" style={{ textAlign: 'center' }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
