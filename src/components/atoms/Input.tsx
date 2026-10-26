import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { componentTokens as c, globalTokens as g, semanticTokens as s } from '../../design';

type Props = TextInputProps & { invalid?: boolean };

export function Input({ invalid, style, onFocus, onBlur, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        backgroundColor: focused ? g.color.yellow[500] + '55' : c.input.bg,
        borderWidth: g.border.thick,
        borderColor: invalid ? c.input.errorBorder : c.input.border,
        borderRadius: g.radius.sm,
        minHeight: c.input.minHeight,
        justifyContent: 'center',
        paddingHorizontal: g.spacing[4],
      }}
    >
      <TextInput
        {...rest}
        placeholderTextColor={s.color.text.secondary}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[{ fontFamily: g.fontFamily.body, fontSize: g.fontSize.md, color: s.color.text.primary, paddingVertical: g.spacing[3] }, style]}
      />
    </View>
  );
}
