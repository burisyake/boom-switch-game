import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GameBoard from '../components/GameBoard';

export default function SwitchGameScreen() {
  return (
    <View style={styles.container}>
      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
