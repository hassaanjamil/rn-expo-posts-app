import React from 'react';
import { ThemedText, ThemedView } from '@/presentation/components/theme';

export const FavoriteScreen: React.FC = () => (
  <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ThemedText type="title">Favorite</ThemedText>
  </ThemedView>
);
