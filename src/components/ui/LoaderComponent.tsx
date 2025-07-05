import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

type LoaderComponentProps = {
  color: string;
}
const LoaderComponent = (props: LoaderComponentProps) => {
  const { color } = props;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={color} />
    </View>
  )
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});

export default LoaderComponent;