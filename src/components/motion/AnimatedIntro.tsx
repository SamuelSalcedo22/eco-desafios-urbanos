import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Icon, Text } from '../atoms';
import { CATEGORY_META, CATEGORY_ORDER } from '../../content/categories';
import { globalTokens as g, motionTokens as m, semanticTokens as s } from '../../design';
import { t } from '../../i18n';

const BLOCK = 76;
const TILT = [-8, 6, 10, -5];

/** Un bloque de categoría que cae desde arriba y rebota al chocar. */
function FallingBlock({ index, reduce }: { index: number; reduce: boolean }) {
  const category = CATEGORY_ORDER[index];
  const meta = CATEGORY_META[category];
  const y = useSharedValue(reduce ? 0 : -520 - index * 60);
  const rot = useSharedValue(reduce ? TILT[index] : TILT[index] * 4);

  useEffect(() => {
    const delay = 120 + index * 110;
    // Cae y rebota; luego, ya en reposo, da un saltito en "ola" junto a los demás bloques.
    y.value = reduce
      ? 0
      : withSequence(
          withDelay(delay, withSpring(0, m.spring.bouncy)),
          withDelay(1500 - delay + index * 130, withSequence(withTiming(-22, { duration: 160 }), withSpring(0, m.spring.bouncy))),
        );
    rot.value = withDelay(delay, withSpring(TILT[index], m.spring.bouncy));
  }, [index, reduce, rot, y]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: `${rot.value}deg` }],
  }));

  return (
    <Animated.View style={[{ width: BLOCK, height: BLOCK }, style]}>
      <View style={[styles.block, styles.shadow]} />
      <View style={[styles.block, { backgroundColor: meta.color }]}>
        <Icon name={meta.icon} size={34} />
      </View>
    </Animated.View>
  );
}

/**
 * Intro de marca al abrir la app: los 4 bloques de categoría caen y rebotan,
 * el título se "estampa" y la franja negra entra de lado. Luego todo sube y deja ver la app.
 * Con "reducir movimiento" activo, solo aparece y se desvanece.
 */
export function AnimatedIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const { height, width } = useWindowDimensions();

  const titleScale = useSharedValue(reduce ? 1 : 1.9);
  const titleOpacity = useSharedValue(reduce ? 1 : 0);
  const barX = useSharedValue(reduce ? 0 : -width);
  const exitY = useSharedValue(0);
  const exitOpacity = useSharedValue(1);

  useEffect(() => {
    titleOpacity.value = withDelay(620, withTiming(1, { duration: m.duration.fast }));
    titleScale.value = withDelay(620, withSpring(1, m.spring.snappy));
    barX.value = withDelay(880, withSpring(0, m.spring.snappy));

    const total = reduce ? 900 : m.duration.intro;
    if (reduce) {
      exitOpacity.value = withDelay(total - 300, withTiming(0, { duration: 300 }));
    } else {
      exitY.value = withDelay(total - 380, withTiming(-height, { duration: 380, easing: Easing.in(Easing.cubic) }));
    }
    const timer = setTimeout(onDone, total);
    return () => clearTimeout(timer);
  }, [barX, exitOpacity, exitY, height, onDone, reduce, titleOpacity, titleScale]);

  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value, transform: [{ scale: titleScale.value }] }));
  const barStyle = useAnimatedStyle(() => ({ transform: [{ translateX: barX.value }, { rotate: '-2deg' }] }));
  const exitStyle = useAnimatedStyle(() => ({ opacity: exitOpacity.value, transform: [{ translateY: exitY.value }] }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, exitStyle]} accessibilityLabel={t('common.appName')}>
      <View style={styles.grid}>
        {CATEGORY_ORDER.map((c, i) => (
          <FallingBlock key={c} index={i} reduce={reduce} />
        ))}
      </View>
      <Animated.View style={[{ alignItems: 'center', gap: g.spacing[3] }, titleStyle]}>
        <Text variant="display" style={{ fontSize: g.fontSize['3xl'], lineHeight: g.fontSize['3xl'] * 1.05, textAlign: 'center' }}>
          ECO-{'\n'}DESAFÍOS
        </Text>
      </Animated.View>
      <Animated.View style={[styles.bar, barStyle]}>
        <Text variant="title" color={g.color.yellow[500]}>
          URBANOS
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: s.color.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.spacing[6],
    zIndex: 10,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: BLOCK * 2 + g.spacing[4], gap: g.spacing[4] },
  block: {
    position: 'absolute',
    width: BLOCK,
    height: BLOCK,
    borderRadius: g.radius.md,
    borderWidth: g.border.thick,
    borderColor: g.color.ink[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: { backgroundColor: g.color.ink[900], left: g.shadowOffset.md, top: g.shadowOffset.md },
  bar: {
    backgroundColor: g.color.ink[900],
    paddingHorizontal: g.spacing[5],
    paddingVertical: g.spacing[2],
  },
});
