import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { motionTokens as m } from '../../design';

/**
 * Envuelve un elemento de lista para que entre en cascada (de abajo hacia arriba, con resorte).
 * Respeta "reducir movimiento" del sistema (comportamiento por defecto de Reanimated).
 */
export function StaggerItem({ index, children, style }: { index: number; children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const delay = Math.min(index, m.maxStaggerItems) * m.stagger;
  return (
    <Animated.View style={style} entering={FadeInDown.delay(delay).springify().damping(m.spring.snappy.damping).stiffness(m.spring.snappy.stiffness)}>
      {children}
    </Animated.View>
  );
}
