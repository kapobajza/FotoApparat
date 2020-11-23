import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { HomeScreen } from '../screens';
import { DrawerContent } from '../components/drawer-content';

const Drawer = createDrawerNavigator();

export default function AppRouter() {
  const customDrawerContent = (
    props: DrawerContentComponentProps<DrawerContentOptions>,
  ) => <DrawerContent {...props} />;

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={customDrawerContent}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
