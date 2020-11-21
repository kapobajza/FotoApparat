import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthRouter from './auth-router';
import AppRouter from './app-router';
import { AuthProvider, AuthContextType } from '../contexts/auth-context';

const MainRouter = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
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
