// Required for react-navigation
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-community/google-signin';

import Router from './router/main-router';
import { colors } from './styles';
import { AppConfig } from './config';
import { FlashMessageProvider } from './custom-lib/flash-message';
import { LoadingProvider } from './custom-lib/loading';
import { ModalProvider } from './custom-lib/modal';
import { StackType } from './custom-lib/modal/types';
import { TestModal } from './components/modals';

// Set the background color of all components to be white by default
const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

// It is enough to call configure only once
// Configure Google sing in to ask for Google drive permission
GoogleSignin.configure({
  scopes: AppConfig.GOOGLE_SCOPES,
  webClientId: AppConfig.ANDROID_WEB_CLIENT_ID,
});

const modalStack: StackType = {
  TestModal,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={CustomTheme}>
        <FlashMessageProvider>
          <LoadingProvider>
            <ModalProvider stack={modalStack}>
              <StatusBar
                backgroundColor={colors.white}
                barStyle="dark-content"
              />
              <Router />
            </ModalProvider>
          </LoadingProvider>
        </FlashMessageProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
