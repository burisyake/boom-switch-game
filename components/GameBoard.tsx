import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';

const MAX_COLUMNS = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_MARGIN = 4;
const TOTAL_MARGIN = BUTTON_MARGIN * (MAX_COLUMNS + 1);
const BUTTON_WIDTH = (SCREEN_WIDTH - TOTAL_MARGIN) / MAX_COLUMNS;

export default function GameBoard() {
  // スイッチ総数
  const buttonCount = useSettingsStore((state: { buttonCount: number }) => state.buttonCount);
  // 爆弾総数
  const bombCount = useSettingsStore((state: { bombCount: number }) => state.bombCount);
  // 爆弾のindex
  const [bombIndexes, setBombIndexes] = useState<number[]>([]);
  // 残爆弾数
  const [remainingBombs, setRemainingBombs] = useState(0);
  // 残安全スイッチ数
  const [remainingSafe, setRemainingSafe] = useState(0);
  // 残スイッチ数
  const [remainingUntouched, setRemainingUntouched] = useState(0);
  // 各スイッチが押されたかをindex順に保持
  const [pressed, setPressed] = useState<boolean[]>([]);
  // 最後に押したスイッチのindex
  const [lastPressedIndex, setLastPressedIndex] = useState<number | null>(null);
  // スイッチを押して発見された爆弾のindex
  const [revealedBombs, setRevealedBombs] = useState<number[]>([]);
  // ゲームオーバー
  const [gameOver, setGameOver] = useState(false);
  // ゲームクリア
  const [gameClear, setGameClear] = useState(false);

  // リセット
  useLayoutEffect(() => {
    resetGame();
  }, [buttonCount, bombCount]);

  // 残スイッチ数を計算
  useEffect(() => {
    const validPressed = pressed.map((v) => v === true);
    const untouched = validPressed.filter((p) => !p).length;
    setRemainingUntouched(untouched);
  }, [pressed]);

  // 残安全スイッチ数を計算
  useEffect(() => {
    const pressedSafe = pressed.filter((_, i) => !bombIndexes.includes(i) && pressed[i]).length;
    const safeRemaining = buttonCount - bombIndexes.length - pressedSafe;
    setRemainingSafe(safeRemaining);
  }, [pressed, bombIndexes, buttonCount]);

  // ゲームオーバー・ゲームクリア判定
  useEffect(() => {
    if (gameOver) return;
    const totalSafe = buttonCount - bombIndexes.length;
    const pressedSafe = pressed.filter((_, i) => !bombIndexes.includes(i) && pressed[i]).length;
    if (pressedSafe === totalSafe) {
      setGameClear(true);
      setGameOver(true);
    }
  }, [pressed, bombIndexes, buttonCount, gameOver]);

  // 再ゲームのための初期設定
  const resetGame = () => {
    const currentButtonCount = Number(buttonCount);
    const currentbombCount = Number(bombCount);
    const newPressed = Array(currentButtonCount).fill(false);
    const indexes = new Set<number>();
    while (indexes.size < currentbombCount) {
      indexes.add(Math.floor(Math.random() * currentButtonCount));
    }
    setBombIndexes(Array.from(indexes));
    setPressed(newPressed);
    setGameOver(false);
    setGameClear(false);
    setRemainingBombs(currentbombCount);
    setRevealedBombs([]);
  };

  // スイッチ押下時の処理
  const handlePress = (index: number) => {
    if (gameOver || pressed[index] === true) return;
    const updated = Array.from({ length: buttonCount }, (_, i) => pressed[i] === true);
    updated[index] = true;
    console.log('updated', updated);
    setPressed(updated);
    setLastPressedIndex(index);
    if (bombIndexes.includes(index)) {
      setRevealedBombs((prev) => [...prev, index]);
      const remaining = remainingBombs - 1;
      setRemainingBombs(remaining);
      // 最後の爆弾だったらゲームオーバー
      if (remaining === 0) {
        setGameOver(true);
      }
    }
  };

  // スイッチの描画処理
  const renderButtons = () => {
    return Array.from({ length: buttonCount }).map((_, index) => {
      const isPressed = pressed[index];
      const isBomb = revealedBombs.includes(index);
      const isLast = gameClear && lastPressedIndex === index;

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            { width: BUTTON_WIDTH, height: BUTTON_WIDTH },
            isPressed && styles.pressed,
            isBomb && styles.bomb,
            isLast && styles.success,
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
      <Text style={styles.title}>
        残り ◻️{remainingUntouched}個(💣{remainingBombs}個/☑️{remainingSafe}個)
      </Text>
      <ScrollView contentContainerStyle={styles.grid}>{renderButtons()}</ScrollView>
      {gameOver && (
        <View style={styles.overlay}>
          <View style={styles.gameOverBox}>
            <Text style={styles.gameOverText}>
              {gameClear ? '🎉 ゲームクリア 🎉' : '💥 ゲームオーバー 💥'}
            </Text>
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
  title: { fontSize: 24, marginTop: 10, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: BUTTON_MARGIN,
    minWidth: SCREEN_WIDTH,
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
  success: {
    backgroundColor: 'mediumseagreen',
  },
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
