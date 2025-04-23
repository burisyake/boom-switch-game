import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Platform, SafeAreaView } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';

export default function SettingsScreen() {
  const buttonCount = useSettingsStore((state) => state.buttonCount);
  const setButtonCount = useSettingsStore((state) => state.setButtonCount);
  const bombCount = useSettingsStore((state) => state.bombCount);
  const setBombCount = useSettingsStore((state) => state.setBombCount);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>スイッチの個数を選択</Text>
        <Text style={styles.currentCount}>現在：{buttonCount}個</Text>

        <ScrollView
          horizontal
          contentContainerStyle={styles.buttons}
          showsHorizontalScrollIndicator={false}
        >
          {[...Array(60)].map((_, i) => {
            const count = i + 1; // 1〜60
            return (
              <View key={count} style={styles.buttonWrapper}>
                <Button
                  title={`${count}個`}
                  onPress={() => setButtonCount(count)}
                  color={count === buttonCount ? '#007AFF' : '#999'}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{ marginTop: 40 }}>
        <Text style={styles.title}>爆弾の個数を選択</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.buttons}
          showsHorizontalScrollIndicator={false}
        >
          {[...Array(9)].map((_, i) => {
            const count = i + 1;
            return (
              <View key={count} style={styles.buttonWrapper}>
                <Button
                  title={`💣${count}`}
                  onPress={() => setBombCount(count)}
                  color={count === bombCount ? '#FF3B30' : '#999'}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentCount: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  buttonWrapper: {
    marginHorizontal: 6,
    marginVertical: 6,
  },
});
