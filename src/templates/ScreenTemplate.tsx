import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { semanticTokens as s } from '../design';

type Props = { children: React.ReactNode; scroll?: boolean; footer?: React.ReactNode };

/** Template: estructura sin contenido real (fondo, márgenes, scroll opcional, pie fijo). */
export function ScreenTemplate({ children, scroll = true, footer }: Props) {
  const pad = s.space.screenPadding;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: s.color.background.primary }} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView contentContainerStyle={{ padding: pad, gap: s.space.stack, paddingBottom: pad * 2 }} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, padding: pad, gap: s.space.stack }}>{children}</View>
      )}
      {footer ? <View style={{ padding: pad, paddingTop: 0 }}>{footer}</View> : null}
    </SafeAreaView>
  );
}
