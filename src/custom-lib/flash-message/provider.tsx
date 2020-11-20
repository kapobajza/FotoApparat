import React, { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FlashMessageContext from './context';
import { FlashMessageContextType } from './types';
import FlashMessage from './flash-message';
import colors from '../../styles/colors';

interface Props {
  children: ReactNode;
  timeout?: number;
}

const FlashMessageProvider: React.FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [contextValue, setContextValue] = useState<FlashMessageContextType>({
    showError: () => {},
    showSuccess: () => {},
    showInfo: () => {},
  });

  return (
    <FlashMessageContext.Provider value={contextValue}>
      {children}
      <View style={[styles.outerContainer, { bottom: insets.bottom + 30 }]}>
        <FlashMessage setContextValue={setContextValue} />
      </View>
    </FlashMessageContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  outerContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
  },
  message: {
    color: colors.white,
    fontSize: 16,
  },
});

FlashMessageProvider.defaultProps = {
  timeout: 3000,
};

export default FlashMessageProvider;
