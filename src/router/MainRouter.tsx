import React, { useEffect, useState, useMemo } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { AuthService } from '../services';

import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import { AuthProvider, AuthContextType } from '../contexts';
import { useFlashMessage } from '../ComponentLibrary/FlashMessage';
import { useLoading } from '../ComponentLibrary/Loading';

const MainRouter = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
