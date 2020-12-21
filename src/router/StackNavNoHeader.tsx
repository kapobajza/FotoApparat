import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { StackNavigationConfig } from '@react-navigation/stack/src/types';
import { DefaultNavigatorOptions, StackRouterOptions } from '@react-navigation/native';

declare type StackNavProps = DefaultNavigatorOptions<StackNavigationOptions> &
  StackRouterOptions &
  StackNavigationConfig;

const Stack = createStackNavigator();

const StackNavWithoutHeader: React.FC<StackNavProps> = ({ children, ...rest }) => {
  return (
    <Stack.Navigator headerMode="none" {...rest}>
      {children}
    </Stack.Navigator>
  );
};

export default StackNavWithoutHeader;
