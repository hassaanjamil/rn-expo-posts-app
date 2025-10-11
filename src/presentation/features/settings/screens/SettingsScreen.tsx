import React, { useCallback, useState } from 'react';
import { useAuth } from '@/main/auth';
import { ThemedButton, ThemedText, ThemedView } from '@/presentation/components/theme';

export const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setIsProcessing(true);
      await logout();
    } finally {
      setIsProcessing(false);
    }
  }, [logout]);

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedButton type="primary" title="Logout" onPress={handleLogout} disabled={isProcessing} />
    </ThemedView>
  );
};
