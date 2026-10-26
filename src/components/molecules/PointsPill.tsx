import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '../atoms';
import { globalTokens as g, neoBorder } from '../../design';

export function PointsPill({ points, bg = g.color.yellow[400] }: { points: number; bg?: string }) {
  return (
    <View
      style={[
        neoBorder('thin'),
        { flexDirection: 'row', alignItems: 'center', gap: g.spacing[1], backgroundColor: bg, borderRadius: g.radius.pill, paddingHorizontal: g.spacing[3], paddingVertical: g.spacing[1], alignSelf: 'flex-start' },
      ]}
    >
      <Icon name="flash" size={14} />
      <Text variant="label" numberOfLines={1}>
        {points}
      </Text>
    </View>
  );
}
