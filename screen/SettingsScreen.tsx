import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSettingsStore } from '../stores/settingsStore';

export default function SettingsScreen() {
  const buttonCount = useSettingsStore((state) => state.buttonCount);
  const setButtonCount = useSettingsStore((state) => state.setButtonCount);
  const bombCount = useSettingsStore((state) => state.bombCount);
  const setBombCount = useSettingsStore((state) => state.setBombCount);

  const prevButtonCountRef = useRef(buttonCount);

  const handleButtonCountChange = (newCount: number) => {
    const prevCount = prevButtonCountRef.current;
    if (newCount < prevCount && prevCount !== 0 && bombCount > 0) {
      const ratio = newCount / prevCount;
      const adjustedBombCount = Math.floor(bombCount * ratio);
      // 最小1、最大newCountに制限
      const newBombCount = Math.min(Math.max(adjustedBombCount, 1), newCount);
      setBombCount(newBombCount);
    }
    setButtonCount(newCount);
    prevButtonCountRef.current = newCount;
  };

  useEffect(() => {
    if (bombCount > buttonCount) {
      setBombCount(buttonCount);
    }
  }, [buttonCount]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>スイッチの個数</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={buttonCount}
          onValueChange={(value) => {
            setButtonCount(value);
            handleButtonCountChange(value);
          }}
          style={styles.picker}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const count = i + 1;
            return <Picker.Item key={count} label={`🔘${count}個`} value={count} />;
          })}
        </Picker>
      </View>

      <Text style={[styles.title, { marginTop: 32 }]}>爆弾の個数</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={bombCount}
          onValueChange={(value) => setBombCount(value)}
          style={styles.picker}
        >
          {Array.from({ length: buttonCount }, (_, i) => {
            const count = i + 1;
            return <Picker.Item key={count} label={`💣 ${count}個`} value={count} />;
          })}
        </Picker>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    height: 55,
    width: '100%',
  },
});
