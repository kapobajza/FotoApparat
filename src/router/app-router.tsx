import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavWithoutHeader from './stack-nav-no-header';
import { HomeScreen } from '../screens';

const Stack = createStackNavigator();

export default function AppRouter() {
  return (
    <StackNavWithoutHeader>
      <Stack.Screen name="Home" component={HomeScreen} />
    </StackNavWithoutHeader>
  );
}
