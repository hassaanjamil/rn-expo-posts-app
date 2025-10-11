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
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans/400Regular';
import { NotoSans_500Medium } from '@expo-google-fonts/noto-sans/500Medium';
import { NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans/600SemiBold';
import { NotoSans_700Bold } from '@expo-google-fonts/noto-sans/700Bold';

function RootNavigation() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
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
