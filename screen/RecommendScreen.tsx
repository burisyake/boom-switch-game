import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import AdBanner from '../components/AdBanner';

const appList = [
  {
    title: 'Pomodoro TaskTic',
    description: '25分集中＆5分休憩で作業効率アップ！シンプルで洗練されたポモドーロタイマー。',
    url: 'https://apps.apple.com/jp/app/pomodoro-tasktic/id6743796326?platform=iphone',
    icon: require('../assets/recommendIcons/pomodoroTaskTic.png'),
  },
];

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 2;

export default function RecommendScreen() {
  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: (typeof appList)[number] }) => (
    <TouchableOpacity style={styles.card} onPress={() => openURL(item.url)}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.appTitle}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>開く</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={appList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 16,
    color: '#2b2b2b',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    width: (Dimensions.get('window').width - 60) / 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4a4a4a',
  },
  description: {
    fontSize: 14,
    color: '#5f5f5f',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
