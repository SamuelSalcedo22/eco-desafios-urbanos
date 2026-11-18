import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider, useLang } from './src/context/LanguageContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ErrorBoundary } from './src/components/organisms/ErrorBoundary';
import { semanticTokens as s } from './src/design';
import { isDemoMode } from './src/services';
import { SetupRequiredScreen } from './src/screens/SetupRequiredScreen';
import { AnimatedIntro } from './src/components/motion';

function Shell() {
  const { lang } = useLang();
  const { scheme } = useTheme();
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  // Fondo de navegación = fondo del tema: evita destellos blancos en las transiciones.
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: s.color.background.primary,
      card: s.color.background.surface,
      text: s.color.text.primary,
      border: s.color.border.default,
    },
  };
  // key: al cambiar de idioma o de modo claro/oscuro se vuelve a pintar toda la app
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer key={`${lang}-${scheme}`} theme={navTheme}>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppBody />
    </ThemeProvider>
  );
}

function AppBody() {
  const [loaded] = useFonts({ ArchivoBlack_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_700Bold });
  const [introDone, setIntroDone] = React.useState(false);
  const finishIntro = React.useCallback(() => setIntroDone(true), []);
  if (!loaded) return <View style={{ flex: 1, backgroundColor: s.color.background.primary }} />;
  // Producto real: una build instalable sin servidor nunca cae en modo demo en silencio.
  if (!__DEV__ && isDemoMode) {
    return (
      <SafeAreaProvider>
        <LanguageProvider>
          <SetupRequiredScreen />
        </LanguageProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <Shell />
          {/* La app carga detrás mientras corre la intro; al terminar, la intro se desmonta. */}
          {!introDone ? <AnimatedIntro onDone={finishIntro} /> : null}
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
