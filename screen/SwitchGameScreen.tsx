import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GameBoard from '../components/GameBoard';
import AdBanner from '../components/AdBanner';

export default function SwitchGameScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <GameBoard />
      </View>
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
