import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider, useLang } from './src/context/LanguageContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ErrorBoundary } from './src/components/organisms/ErrorBoundary';
import { semanticTokens as s } from './src/design';

function Shell() {
  const { lang } = useLang();
  // key={lang}: al cambiar de idioma se vuelve a pintar toda la app
  return (
    <NavigationContainer key={lang}>
      <ErrorBoundary>
        <RootNavigator />
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default function App() {
  const [loaded] = useFonts({ ArchivoBlack_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_700Bold });
  if (!loaded) return <View style={{ flex: 1, backgroundColor: s.color.background.primary }} />;

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Shell />
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
