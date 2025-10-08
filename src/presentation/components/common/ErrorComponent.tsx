import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/presentation/components/theme/ThemedView';
import { ThemedText } from '@/presentation/components/theme/ThemedText';

type ErrorComponentProps = {
  message?: string;
};

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Something went wrong</ThemedText>
    {message ? <ThemedText style={styles.message}>{message}</ThemedText> : null}
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  title: {
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: '#b71c1c',
    fontSize: 14,
    textAlign: 'center',
  },
});
