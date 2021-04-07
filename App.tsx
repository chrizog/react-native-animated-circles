/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DummyScreen, LoadingAnimationScreen } from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingAnimation" options={{headerShown: false}} component={LoadingAnimationScreen} />
        <Stack.Screen name="StartScreen" component={DummyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
