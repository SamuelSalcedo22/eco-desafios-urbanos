import React, { useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { globalTokens as g, semanticTokens as s } from '../../design';

type Props = {
  children?: React.ReactNode;
  bg?: string;
  radius?: number;
  offset?: number;
  borderWidth?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

/**
 * Caja Neo-Brutalist: borde grueso + sombra sólida desplazada.
 * La sombra es una vista negra detrás, así se ve igual en Android e iPhone.
 * Si recibe onPress, al presionar el contenido "se hunde" sobre la sombra.
 */
export function NeoBox({
  children,
  bg = s.color.background.surface,
  radius = g.radius.md,
  offset = g.shadowOffset.md,
  borderWidth = g.border.thick,
  padding = 0,
  style,
  contentStyle,
  onPress,
  disabled,
  accessibilityLabel,
}: Props) {
  const [pressed, setPressed] = useState(false);
  const shift = pressed ? offset : 0;

  const body = (
    <View style={{ marginRight: offset, marginBottom: offset }}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: offset,
          left: offset,
          right: -offset,
          bottom: -offset,
          backgroundColor: g.color.ink[900],
          borderRadius: radius,
        }}
      />
      <View
        style={[
          {
            backgroundColor: bg,
            borderRadius: radius,
            borderWidth,
            borderColor: g.color.ink[900],
            padding,
            transform: [{ translateX: shift }, { translateY: shift }],
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );

  if (!onPress) return <View style={style}>{body}</View>;

  return (
    <Pressable
      style={style}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {body}
    </Pressable>
  );
}
