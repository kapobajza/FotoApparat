// Required for react-navigation
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Router from './router/main-router';
import colors from './styles/colors';

// Set the background color of all components to be white by default
const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={CustomTheme}>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
