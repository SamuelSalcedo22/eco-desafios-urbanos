import React from 'react';
import { Pressable } from 'react-native';
import { globalTokens as g, neoBorder, semanticTokens as s } from '../../design';
import { Text } from './Text';

type Props = { label: string; selected?: boolean; color?: string; onPress: () => void };

export function Chip({ label, selected, color = s.color.action.secondary, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={[
        neoBorder('thin'),
        {
          backgroundColor: selected ? color : s.color.background.surface,
          borderRadius: g.radius.pill,
          paddingHorizontal: g.spacing[4],
          paddingVertical: g.spacing[2],
          maxWidth: 220,
        },
      ]}
    >
      <Text variant="label" numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </Pressable>
  );
}
