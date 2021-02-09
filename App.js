import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "./app/CartScreen";
import ManageScreen from "./app/ManageScreen";
import RecentScreen from "./app/RecentScreen";
import Testing from "./app/Components/Testing";
import Home from "./app/Home";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Orders" component={RecentScreen} />

        <Stack.Screen name="Manage Screen" component={ManageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
