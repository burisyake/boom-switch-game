// components/GameBoard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GRID_SIZE = 4;

export default function GameBoard() {
  const [bombIndex, setBombIndex] = useState<number | null>(null);
  const [pressed, setPressed] = useState<boolean[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomBomb = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
    setBombIndex(randomBomb);
    setPressed(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setGameOver(false);
  };

  const handlePress = (index: number) => {
    if (gameOver || pressed[index]) return;

    const updated = [...pressed];
    updated[index] = true;
    setPressed(updated);

    if (index === bombIndex) {
      setGameOver(true);
    }
  };

  const renderButtons = () => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
      const isPressed = pressed[index];
      const isBomb = gameOver && index === bombIndex;

      return (
        <TouchableOpacity
          key={index}
          style={[styles.button, isPressed && styles.pressed, isBomb && styles.bomb]}
          onPress={() => handlePress(index)}
        >
          {isPressed && <Text style={styles.buttonText}>{isBomb ? '💣' : '✔'}</Text>}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>爆破スイッチゲーム</Text>
      <View style={styles.grid}>{renderButtons()}</View>
      {gameOver && (
        <View>
          <Text style={styles.gameOverText}>💥 ゲームオーバー 💥</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetText}>もう一度</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 240 },
  button: {
    width: 55,
    height: 55,
    margin: 2,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  pressed: { backgroundColor: '#aaa' },
  bomb: { backgroundColor: 'red' },
  buttonText: { fontSize: 18 },
  gameOverText: { fontSize: 22, color: 'red', marginVertical: 20 },
  resetButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  resetText: { color: '#fff', fontSize: 16 },
});
