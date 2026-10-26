import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon, Text } from '../atoms';
import { componentTokens as c, globalTokens as g } from '../../design';
import { t } from '../../i18n';

const ICONS = { Missions: 'leaf', Map: 'map', Ranking: 'trophy', Profile: 'person' } as const;
const LABEL_KEYS = { Missions: 'tabs.missions', Map: 'tabs.map', Ranking: 'tabs.ranking', Profile: 'tabs.profile' } as const;

/**
 * Navegación global (bottom nav). Las etiquetas tienen plan de truncamiento
 * (1 línea + puntos suspensivos) para que no rompan con idiomas más largos.
 */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: c.tabBar.bg, borderTopWidth: g.border.heavy, borderTopColor: g.color.ink[900], paddingBottom: insets.bottom, minHeight: c.tabBar.height + insets.bottom }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const name = route.name as keyof typeof ICONS;
        const label = t(LABEL_KEYS[name]);
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: focused }}
            onPress={() => {
              const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
            }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, paddingHorizontal: 2, backgroundColor: focused ? c.tabBar.activeBg : 'transparent', borderRightWidth: index < state.routes.length - 1 ? g.border.thin : 0, borderRightColor: g.color.ink[900] }}
          >
            <Icon name={focused ? ICONS[name] : (`${ICONS[name]}-outline` as never)} size={24} />
            <Text variant="caption" numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: g.fontFamily.bodyBold, maxWidth: '100%' }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
