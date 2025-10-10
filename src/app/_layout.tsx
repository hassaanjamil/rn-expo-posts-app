import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/main/auth';
import { useColorScheme } from '@/main/hooks';
import '@/main/localization/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootNavigation() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (isInitializing || !fontsLoaded) {
      return;
    }

    const firstSegment = segments[0];
    const onAuthRoute = firstSegment === 'auth';

    if (!isAuthenticated && !onAuthRoute) {
      router.replace('/auth');
    } else if (isAuthenticated && (onAuthRoute || firstSegment === undefined)) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitializing, fontsLoaded, router, segments]);

  if (!fontsLoaded || isInitializing) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="post-detail" options={{ title: 'Post Detail' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
