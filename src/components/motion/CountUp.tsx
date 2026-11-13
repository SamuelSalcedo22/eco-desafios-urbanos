import React, { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Text } from '../atoms';
import { motionTokens as m } from '../../design';

type Props = { to: number; prefix?: string; duration?: number; variant?: 'display' | 'title' };

/** Número que sube de 0 al valor final (ease-out). Con "reducir movimiento" muestra el valor directo. */
export function CountUp({ to, prefix = '', duration = m.duration.slow * 2, variant = 'display' }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then((reduce) => {
        if (cancelled) return;
        if (reduce) return setValue(to);
        const start = Date.now();
        const tick = () => {
          const p = Math.min(1, (Date.now() - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <Text variant={variant} accessibilityLabel={`${prefix}${to}`}>
      {prefix}
      {value}
    </Text>
  );
}
