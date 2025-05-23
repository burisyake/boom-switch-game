import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSettingsStore } from '../stores/settingsStore';
import AdBanner from '../components/AdBanner';

export default function SettingsScreen() {
  const buttonCount = useSettingsStore((state) => state.buttonCount);
  const setButtonCount = useSettingsStore((state) => state.setButtonCount);
  const bombCount = useSettingsStore((state) => state.bombCount);
  const setBombCount = useSettingsStore((state) => state.setBombCount);

  const prevButtonCountRef = useRef(buttonCount);

  // スイッチ数変更時の処理（減らしたら爆弾数も縮小）
  const handleButtonCountChange = (newCount: number) => {
    const prevCount = prevButtonCountRef.current;
    if (newCount < prevCount && prevCount !== 0 && bombCount > 0) {
      const ratio = newCount / prevCount;
      const adjustedBombCount = Math.floor(bombCount * ratio);
      const newBombCount = Math.min(Math.max(adjustedBombCount, 1), newCount - 1);
      setBombCount(newBombCount);
    }
    setButtonCount(newCount);
    prevButtonCountRef.current = newCount;
  };

  // 爆弾数がスイッチ数以上にならないように調整
  useEffect(() => {
    if (bombCount >= buttonCount) {
      setBombCount(buttonCount - 1);
    }
  }, [buttonCount]);

  // 爆弾数選択時の制御
  const handleBombCountChange = (newCount: number) => {
    const safeValue = Math.min(newCount, buttonCount - 1);
    setBombCount(safeValue);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>🔘 スイッチの個数</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={buttonCount}
              onValueChange={(value) => handleButtonCountChange(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 60 }, (_, i) => {
                const count = i + 1;
                return <Picker.Item key={count} label={`${count} 個`} value={count} />;
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>💣 爆弾の個数</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={bombCount}
              onValueChange={(value) => handleBombCountChange(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: buttonCount - 1 }, (_, i) => {
                const count = i + 1;
                return <Picker.Item key={count} label={`💣 ${count} 個`} value={count} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 55,
    width: '100%',
  },
  pickerItem: {
    fontSize: 18,
  },
});
