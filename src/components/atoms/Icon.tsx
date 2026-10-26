import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { semanticTokens as s } from '../../design';

type Props = { name: React.ComponentProps<typeof Ionicons>['name']; size?: number; color?: string };

export function Icon({ name, size = 24, color = s.color.text.primary }: Props) {
  return <Ionicons name={name} size={size} color={color} />;
}
