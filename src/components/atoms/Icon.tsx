import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { semanticTokens as s } from '../../design';
import { useContentColor } from './ContentColor';

type Props = { name: React.ComponentProps<typeof Ionicons>['name']; size?: number; color?: string };

export function Icon({ name, size = 24, color }: Props) {
  const inherited = useContentColor();
  color = color ?? inherited ?? s.color.text.primary;
  return <Ionicons name={name} size={size} color={color} />;
}
