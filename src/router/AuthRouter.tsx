import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavWithoutHeader from './StackNavNoHeader';
import { WelcomeScreen } from '../screens';

const Stack = createStackNavigator();

export default function AuthRouter() {
  return (
    <StackNavWithoutHeader>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </StackNavWithoutHeader>
  );
}
