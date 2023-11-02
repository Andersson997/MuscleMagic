import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
       <LinearGradient
        style={styles.background}
        colors={["#0F0264", "#0F3362", "#030D01"]}
      />
      <ActivityIndicator size="large" color="#2e64e5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
});

export default LoadingScreen;