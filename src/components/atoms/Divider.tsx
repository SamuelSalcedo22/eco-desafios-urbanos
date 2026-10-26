import React from 'react';
import { View } from 'react-native';
import { globalTokens as g } from '../../design';

export function Divider() {
  return <View style={{ height: g.border.thin, backgroundColor: g.color.ink[900], width: '100%' }} />;
}
