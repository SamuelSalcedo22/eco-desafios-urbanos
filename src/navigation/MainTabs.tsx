import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MissionsScreen } from '../screens/MissionsScreen';
import { MapScreen } from '../screens/MapScreen';
import { RankingScreen } from '../screens/RankingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TabBar } from '../components/organisms/TabBar';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Missions" component={MissionsScreen as never} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
