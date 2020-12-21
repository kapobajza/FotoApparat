// Required for react-navigation
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-community/google-signin';

import { Router } from './router';
import { colors } from './styles';
import { config } from './config';
import { FlashMessageProvider } from './ComponentLibrary/FlashMessage';
import { LoadingProvider } from './ComponentLibrary/Loading';
import { ModalProvider } from './ComponentLibrary/Modal';
import { ImageRatingModal, UploadProgressModal } from './Components/Modals';

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
  scopes: config.GOOGLE_SCOPES,
  webClientId: config.ANDROID_WEB_CLIENT_ID,
  offlineAccess: true,
});

const modalStack = {
  ImageRatingModal,
  UploadProgressModal,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={CustomTheme}>
        <FlashMessageProvider>
          <LoadingProvider>
            <ModalProvider stack={modalStack}>
              <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
              <Router />
            </ModalProvider>
          </LoadingProvider>
        </FlashMessageProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
