import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/main/hooks';

type LoaderComponentProps = {
  lightColor?: string;
  darkColor?: string;
};

export const LoaderComponent: React.FC<LoaderComponentProps> = ({
  lightColor,
  darkColor,
}) => {
  const indicatorColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={indicatorColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    pointerEvents: 'auto',
  },
});
