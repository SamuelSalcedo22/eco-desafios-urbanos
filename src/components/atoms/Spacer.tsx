import React from 'react';
import { View } from 'react-native';
import { globalTokens as g } from '../../design';

export function Spacer({ size = 4 }: { size?: keyof typeof g.spacing }) {
  return <View style={{ height: g.spacing[size] }} />;
}
