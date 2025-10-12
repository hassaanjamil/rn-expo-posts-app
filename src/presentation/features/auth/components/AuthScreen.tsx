import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/main/auth';
import { ThemedButton, ThemedView } from '@/presentation/components/theme';

import { authStyles } from '../styles/authStyles';

export const AuthScreen: React.FC = () => {
  const { login, isInitializing } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = useCallback(async () => {
    if (isInitializing || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await login();
    } finally {
      setIsSubmitting(false);
    }
  }, [login, setIsSubmitting, isInitializing, isSubmitting]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={authStyles.container}>
        <ThemedButton
          title="Login"
          type="primary"
          onPress={handleLogin}
          disabled={isInitializing || isSubmitting}
        />
        {(isInitializing || isSubmitting) && (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator />
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};
