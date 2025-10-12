import React from 'react';

import { ThemedText, ThemedView } from '@/presentation/components/theme';

export const ProfileScreen: React.FC = () => (
  <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ThemedText type="title">Profile</ThemedText>
  </ThemedView>
);
