import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '@/presentation/components/theme';

export const FavoriteScreen: React.FC = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Favorite</ThemedText>
    </ThemedView>
  </SafeAreaView>
);
