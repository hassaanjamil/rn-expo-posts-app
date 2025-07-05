import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const LoaderComponent = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

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