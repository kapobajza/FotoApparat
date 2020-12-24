import React, { useState, useMemo } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { AuthService } from '../services';

import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import { AuthProvider, AuthContextType } from '../contexts';
import { useFlashMessage } from '../ComponentLibrary/FlashMessage';
import { useLoading } from '../ComponentLibrary/Loading';
import { useMountEffect } from '../ComponentLibrary/hooks';

const MainRouter = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  useMountEffect(() => {
    const initialCall = async () => {
      try {
        startLoading();
        await AuthService.refreshToken();
        setIsSignedIn(true);
      } catch (err) {
        showError(err);
        setIsSignedIn(false);
      } finally {
        stopLoading();
        SplashScreen.hide();
      }
    };

    initialCall();
  });

  const contextValue: AuthContextType = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
    }),
    [isSignedIn],
  );

  return (
    <AuthProvider value={contextValue}>{isSignedIn ? <AppRouter /> : <AuthRouter />}</AuthProvider>
  );
};

export default MainRouter;
