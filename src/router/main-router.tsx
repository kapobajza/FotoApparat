import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthRouter from './auth-router';

const MainRouter = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AuthRouter />;
};

export default MainRouter;
