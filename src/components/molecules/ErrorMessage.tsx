import React from 'react';
import { View } from 'react-native';
import { NeoBox, Text, Icon } from '../atoms';
import { globalTokens as g, semanticTokens as s } from '../../design';
import type { UserError } from '../../utils/errors';

/** Mensaje de error con las 3 partes: qué pasó, por qué (si ayuda) y qué hacer. */
export function ErrorMessage({ error }: { error: UserError }) {
  return (
    <NeoBox bg={g.color.pink[500]} offset={g.shadowOffset.sm} padding={g.spacing[4]} radius={g.radius.sm}>
      <View accessibilityRole="alert" style={{ flexDirection: 'row', gap: g.spacing[3] }}>
        <Icon name="alert-circle" size={26} color={s.color.text.primary} />
        <View style={{ flex: 1, gap: g.spacing[1] }}>
          <Text variant="subtitle">{error.what}</Text>
          {error.why ? <Text variant="body">{error.why}</Text> : null}
          <Text variant="body" style={{ fontFamily: g.fontFamily.bodyBold }}>
            {error.action}
          </Text>
        </View>
      </View>
    </NeoBox>
  );
}
