import React from 'react';
import { View } from 'react-native';
import { componentTokens as c, globalTokens as g, neoBorder } from '../../design';
import { Text } from './Text';
import { OnSurface } from './ContentColor';

type Props = { label: string; bg?: string };

export function Badge({ label, bg = c.badge.bg }: Props) {
  return (
    <View
      style={[
        neoBorder('thin'),
        { backgroundColor: bg, borderRadius: g.radius.pill, paddingHorizontal: g.spacing[3], paddingVertical: g.spacing[1], alignSelf: 'flex-start' },
      ]}
    >
      <OnSurface bg={bg}>
        <Text variant="label" numberOfLines={1}>
          {label}
        </Text>
      </OnSurface>
    </View>
  );
}
