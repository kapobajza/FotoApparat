import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { GoogleService } from '../services';

import AuthRouter from './auth-router';
import AppRouter from './app-router';
import { AuthProvider, AuthContextType } from '../contexts/auth-context';
import { useFlashMessage } from '../custom-lib/flash-message';
import { useLoading } from '../custom-lib/loading';

const MainRouter = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const initialCall = async () => {
      try {
        startLoading();
        await GoogleService.signInSilently();
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
  }, []);

  const contextValue: AuthContextType = {
    isSignedIn,
    setIsSignedIn,
  };

  return (
    <AuthProvider value={contextValue}>
      {isSignedIn ? <AppRouter /> : <AuthRouter />}
    </AuthProvider>
  );
};

export default MainRouter;
