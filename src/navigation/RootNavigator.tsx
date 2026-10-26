import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { OnboardingScreen, ONBOARDING_KEY } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { MissionDetailScreen } from '../screens/MissionDetailScreen';
import { EvidenceScreen } from '../screens/EvidenceScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { MainTabs } from './MainTabs';
import { semanticTokens as s } from '../design';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, loading } = useAuth();
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((v) => setSeen(v === '1'))
      .catch(() => setSeen(true));
  }, []);

  if (loading || seen === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: s.color.background.primary }}>
        <ActivityIndicator size="large" color={s.color.text.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="MissionDetail" component={MissionDetailScreen} />
          <Stack.Screen name="Evidence" component={EvidenceScreen} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ gestureEnabled: false }} />
        </>
      ) : (
        <>
          {!seen ? <Stack.Screen name="Onboarding" component={OnboardingScreen} /> : null}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
