import React from 'react';
import { View } from 'react-native';
import { Text } from '../atoms';

type Props = { title: string; right?: React.ReactNode };

export function SectionHeader({ title, right }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text variant="title" style={{ flex: 1 }} numberOfLines={2}>
        {title}
      </Text>
      {right}
    </View>
  );
}
