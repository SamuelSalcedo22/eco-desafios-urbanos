import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { globalTokens as g, semanticTokens as s } from '../../design';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'caption';

const variants: Record<Variant, TextStyle> = {
  display: { fontFamily: g.fontFamily.display, fontSize: g.fontSize['2xl'], lineHeight: g.fontSize['2xl'] * g.lineHeight.tight, textTransform: 'uppercase' },
  title: { fontFamily: g.fontFamily.display, fontSize: g.fontSize.xl, lineHeight: g.fontSize.xl * g.lineHeight.tight },
  subtitle: { fontFamily: g.fontFamily.bodyBold, fontSize: g.fontSize.lg, lineHeight: g.fontSize.lg * g.lineHeight.normal },
  body: { fontFamily: g.fontFamily.body, fontSize: g.fontSize.md, lineHeight: g.fontSize.md * g.lineHeight.normal },
  label: { fontFamily: g.fontFamily.bodyBold, fontSize: g.fontSize.sm, textTransform: 'uppercase', letterSpacing: 0.6 },
  caption: { fontFamily: g.fontFamily.body, fontSize: g.fontSize.xs, lineHeight: g.fontSize.xs * g.lineHeight.normal },
};

type Props = TextProps & { variant?: Variant; color?: string };

export function Text({ variant = 'body', color = s.color.text.primary, style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], { color }, style]} />;
}
