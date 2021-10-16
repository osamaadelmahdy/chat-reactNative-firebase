import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import Home from './Screens/HomeScreen';
import Login from './Screens/LoginScreen';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './Screens/RegisterScreen';
import AddChat from './Screens/AddChat';
import Chat from "./Screens/ChatScreen"

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#006AFF' },
  headerTitleStyle: { color: 'white', textAlign: 'center', flex: 1 },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
