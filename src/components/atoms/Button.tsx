import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { componentTokens as c, globalTokens as g } from '../../design';
import { NeoBox } from './NeoBox';
import { Text } from './Text';
import { Icon } from './Icon';

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  /** Muestra el bloque negro con flecha a la derecha (estilo "SIGN IN →"). */
  arrow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Botón sin ancho fijo: crece con el texto (internacionalización) y el texto
 * hace wrap en vez de cortarse.
 */
export function Button({ label, onPress, variant = 'primary', arrow = true, loading, disabled, style }: Props) {
  const tokens = c.button[variant];
  const isDisabled = disabled || loading;
  return (
    <NeoBox
      onPress={isDisabled ? undefined : onPress}
      bg={tokens.bg}
      offset={g.shadowOffset.sm}
      radius={g.radius.sm}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
      accessibilityLabel={label}
      contentStyle={{ overflow: 'hidden' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'stretch', minHeight: c.button.minHeight }}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: c.button.paddingX, paddingVertical: g.spacing[3] }}>
          {loading ? (
            <ActivityIndicator color={tokens.text} />
          ) : (
            <Text variant="label" color={tokens.text} style={{ fontSize: g.fontSize.md, textAlign: arrow ? 'left' : 'center' }}>
              {label}
            </Text>
          )}
        </View>
        {arrow && (
          <View style={{ width: 56, backgroundColor: g.color.ink[900], alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="arrow-forward" size={26} color={g.color.cream[50]} />
          </View>
        )}
      </View>
    </NeoBox>
  );
}
