import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavWithoutHeader from './stack-nav-no-header';
import WelcomeScreen from '../screens/welcome-screen';

const Stack = createStackNavigator();

export default function AuthRouter() {
  return (
    <StackNavWithoutHeader>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </StackNavWithoutHeader>
  );
}
