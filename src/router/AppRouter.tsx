import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { CameraScreen } from '../screens';
import { DrawerContent } from '../Components/Drawer';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps<DrawerContentOptions>) => (
  <DrawerContent {...props} />
);

export default function AppRouter() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Camera" component={CameraScreen} />
    </Drawer.Navigator>
  );
}
