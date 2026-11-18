import React from 'react';
import { View } from 'react-native';
import { globalTokens as g, semanticTokens as s } from '../../design';

export function Divider() {
  return <View style={{ height: g.border.thin, backgroundColor: s.color.border.default, width: '100%' }} />;
}
