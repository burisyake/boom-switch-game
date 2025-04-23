import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';

const MAX_COLUMNS = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_MARGIN = 4;
const TOTAL_MARGIN = BUTTON_MARGIN * (MAX_COLUMNS + 1);
const BUTTON_WIDTH = (SCREEN_WIDTH - TOTAL_MARGIN) / MAX_COLUMNS;

export default function GameBoard() {
  const buttonCount = useSettingsStore((state: { buttonCount: number }) => state.buttonCount);
  const bombCount = useSettingsStore((state: { bombCount: number }) => state.bombCount);
  const [bombIndexes, setBombIndexes] = useState<number[]>([]);
  const [remainingBombs, setRemainingBombs] = useState(0);
  const [bombIndex, setBombIndex] = useState<number | null>(null);
  const [pressed, setPressed] = useState<boolean[]>([]);
  const [revealedBombs, setRevealedBombs] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, [buttonCount, bombCount]);

  const resetGame = () => {
    const indexes = new Set<number>();
    while (indexes.size < bombCount) {
      indexes.add(Math.floor(Math.random() * buttonCount));
    }
    setBombIndexes(Array.from(indexes));
    setPressed(Array(buttonCount).fill(false));
    setGameOver(false);
    setRemainingBombs(bombCount);
    setRevealedBombs([]);
  };

  const handlePress = (index: number) => {
    if (gameOver || pressed[index]) return;

    const updated = [...pressed];
    updated[index] = true;
    setPressed(updated);

    if (bombIndexes.includes(index)) {
      setRevealedBombs((prev) => [...prev, index]);
      const newRemaining = remainingBombs - 1;
      setRemainingBombs(newRemaining);

      if (newRemaining === 0) {
        setGameOver(true);
      }
    }
  };

  const renderButtons = () => {
    return Array.from({ length: buttonCount }).map((_, index) => {
      const isPressed = pressed[index];
      const isBomb = revealedBombs.includes(index);

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            { width: BUTTON_WIDTH, height: BUTTON_WIDTH },
            isPressed && styles.pressed,
            isBomb && styles.bomb,
          ]}
          onPress={() => handlePress(index)}
        >
          {isPressed && <Text style={styles.buttonText}>{isBomb ? '💣' : '✔'}</Text>}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>爆破スイッチゲーム　残💣{remainingBombs}個</Text>
      <ScrollView contentContainerStyle={styles.grid}>{renderButtons()}</ScrollView>
      {gameOver && (
        <View style={styles.overlay}>
          <View style={styles.gameOverBox}>
            <Text style={styles.gameOverText}>💥 ゲームオーバー 💥</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetText}>もう一度</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  title: { fontSize: 24, marginTop: 60, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: BUTTON_MARGIN,
  },
  button: {
    margin: BUTTON_MARGIN,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  pressed: { backgroundColor: '#aaa' },
  bomb: { backgroundColor: 'red' },
  buttonText: { fontSize: 24 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  gameOverBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  gameOverText: { fontSize: 22, color: 'red', marginVertical: 20 },
  resetButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  resetText: { color: '#fff', fontSize: 16 },
});
