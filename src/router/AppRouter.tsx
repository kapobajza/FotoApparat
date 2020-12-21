import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { HomeScreen } from '../screens';
import { DrawerContent } from '../Components/DrawerContent';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps<DrawerContentOptions>) => (
  <DrawerContent {...props} />
);

export default function AppRouter() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
