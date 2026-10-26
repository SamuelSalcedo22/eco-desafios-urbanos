import React from 'react';
import { NeoBox, Text } from '../atoms';
import { globalTokens as g } from '../../design';

type Props = { label: string; value: string | number; bg: string };

export function StatTile({ label, value, bg }: Props) {
  return (
    <NeoBox bg={bg} padding={g.spacing[4]} offset={g.shadowOffset.sm} radius={g.radius.sm} style={{ flex: 1 }}>
      <Text variant="display" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text variant="label" numberOfLines={2}>
        {label}
      </Text>
    </NeoBox>
  );
}
