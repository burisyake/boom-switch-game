import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SwitchGameScreen from "./screen/SwitchGameScreen";
import SettingsScreen from "./screen/SettingsScreen";
import RecommendScreen from "./screen/RecommendScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="スイッチ" component={SwitchGameScreen} />
        <Tab.Screen name="設定" component={SettingsScreen} />
        <Tab.Screen name="おすすめ" component={RecommendScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
