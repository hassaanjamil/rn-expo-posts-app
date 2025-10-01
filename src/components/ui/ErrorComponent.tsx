import React from 'react';
import { ThemedView } from '../theme/ThemedView';
import { ThemedText } from '../theme/ThemedText';
import { styles } from '@/style/errorStyle';

type ErrorComponentProps = {
  message?: string;
};

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Something went wrong</ThemedText>
    {message ? <ThemedText style={styles.message}>{message}</ThemedText> : null}
  </ThemedView>
);