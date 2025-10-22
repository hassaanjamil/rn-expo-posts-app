import React from 'react';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { profileStyles } from '../styles';

export const ProfileScreen: React.FC = () => (
  <ThemedView style={profileStyles.container}>
    <ThemedText type="title">Profile</ThemedText>
  </ThemedView>
);
