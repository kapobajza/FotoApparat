import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';

import { containerStyles, colors } from '../../styles';
import { LoadingContextType } from './types';
import LoadingState from './state';

interface Props {
  setContextValue: (val: LoadingContextType) => void;
}

const Loading: React.FC<Props> = ({ setContextValue }) => {
  const [loading, setLoading] = useState(false);

  const contextValue: LoadingContextType = {
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };

  useEffect(() => {
    LoadingState.init(contextValue);
    setContextValue(contextValue);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <SafeAreaView
      style={[containerStyles.absoluteFillAndCenter, styles.container]}>
      <ActivityIndicator size="large" color={colors.white} />
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackWithTransparency(0.7),
  },
});
