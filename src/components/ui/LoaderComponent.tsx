import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from '@/style/loaderStyle';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type LoaderComponentProps = {
  lightColor?: string;
  darkColor?: string;
}

const LoaderComponent = (props: LoaderComponentProps) => {
  const { lightColor, darkColor } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={color} />
    </View>
  )
};

export default LoaderComponent;