import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { globalTokens as g } from '../../design';

const COLORS = [g.color.yellow[500], g.color.pink[500], g.color.red[500], g.color.purple[500], g.color.green[500], g.color.blue[500]];
const COUNT = 36;

type Piece = { x: number; drift: number; size: number; color: string; delay: number; spin: number; fall: number; round: boolean };

/** Generador determinista (misma lluvia en cada render, sin Math.random en el hilo de UI). */
function makePieces(width: number): Piece[] {
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: COUNT }, (_, i) => ({
    x: rand() * width,
    drift: (rand() - 0.5) * 160,
    size: 9 + rand() * 9,
    color: COLORS[i % COLORS.length],
    delay: rand() * 380,
    spin: (rand() - 0.5) * 900,
    fall: 1500 + rand() * 900,
    round: rand() > 0.7,
  }));
}

function Confetto({ piece, height }: { piece: Piece; height: number }) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withDelay(piece.delay, withTiming(1, { duration: piece.fall, easing: Easing.out(Easing.quad) }));
  }, [p, piece]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value < 0.85 ? 1 : (1 - p.value) / 0.15,
    transform: [
      { translateY: -40 + p.value * (height + 80) },
      { translateX: piece.drift * p.value },
      { rotate: `${piece.spin * p.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        { left: piece.x, width: piece.size, height: piece.round ? piece.size : piece.size * 0.6, backgroundColor: piece.color, borderRadius: piece.round ? piece.size : 2 },
        style,
      ]}
    />
  );
}

/** Lluvia de confeti con la paleta Retro y borde negro (Neo-Brutalism). No bloquea toques. */
export function ConfettiBurst() {
  const reduce = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const pieces = useMemo(() => makePieces(width), [width]);
  if (reduce) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {pieces.map((piece, i) => (
        <Confetto key={i} piece={piece} height={height} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: { position: 'absolute', top: 0, borderWidth: 2, borderColor: g.color.ink[900] },
});
