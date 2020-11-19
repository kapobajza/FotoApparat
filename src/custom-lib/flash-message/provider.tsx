import React, { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FlashMessageContext from './context';
import { FlashMessageContextType, MessageType } from './types';
import Text from '../../components/text';
import colors from '../../styles/colors';

interface Props {
  children: ReactNode;
  timeout?: number;
}

let timeoutId: any = null;

const FlashMessageProvider: React.FC<Props> = ({ children, timeout }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType>(null);
  const insets = useSafeAreaInsets();

  const removeMessageAfterTimeout = () => {
    timeoutId = setTimeout(() => {
      setMessage(null);
      setType(null);
    }, timeout);
  };

  const contextValue: FlashMessageContextType = {
    showError: (error) => {
      clearTimeout(timeoutId);
      setMessage(error?.message || 'An error occurred');
      setType('error');
      removeMessageAfterTimeout();
    },
    showSuccess: (msg) => {
      clearTimeout(timeoutId);
      setMessage(msg);
      setType('success');
      removeMessageAfterTimeout();
    },
    showInfo: (msg) => {
      clearTimeout(timeoutId);
      setMessage(msg);
      setType('info');
      removeMessageAfterTimeout();
    },
  };

  let backgroundColor = '';

  if (type === 'error') {
    backgroundColor = colors.error;
  } else if (type === 'info') {
    backgroundColor = colors.info;
  } else if (type === 'success') {
    backgroundColor = colors.success;
  }

  return (
    <FlashMessageContext.Provider value={contextValue}>
      {children}
      <View style={[styles.outerContainer, { bottom: insets.bottom + 30 }]}>
        {message ? (
          <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.message}>{message}</Text>
          </View>
        ) : null}
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
