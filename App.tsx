import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SwitchGameScreen from './screen/SwitchGameScreen';
import SettingsScreen from './screen/SettingsScreen';
import RecommendScreen from './screen/RecommendScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help';
            if (route.name === 'スイッチ') {
              iconName = 'radio-button-on';
            } else if (route.name === '設定') {
              iconName = 'settings-outline';
            } else if (route.name === 'おすすめ') {
              iconName = 'bulb-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e86de',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
        })}
      >
        <Tab.Screen name="スイッチ" component={SwitchGameScreen} />
        <Tab.Screen name="設定" component={SettingsScreen} />
        <Tab.Screen name="おすすめ" component={RecommendScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
