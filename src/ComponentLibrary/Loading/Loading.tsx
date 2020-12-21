import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';

import { containerStyles, colors } from '../../styles';
import { LoadingContextType } from './types';
import LoadingState from './State';

interface Props {
  setContextValue: (val: LoadingContextType) => void;
}

const Loading: React.FC<Props> = ({ setContextValue }) => {
  const [loading, setLoading] = useState(false);

  const contextValue: LoadingContextType = useMemo(
    () => ({
      startLoading: () => setLoading(true),
      stopLoading: () => setLoading(false),
      isLoading: loading,
    }),
    [loading],
  );

  useEffect(() => {
    LoadingState.init(contextValue);
    setContextValue(contextValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <SafeAreaView style={[containerStyles.absoluteFillAndCenter, styles.container]}>
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
