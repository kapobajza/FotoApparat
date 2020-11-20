import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { MessageType, FlashMessageContextType } from './types';
import colors from '../../styles/colors';
import Text from '../../components/text';

let timeoutId: any = null;

interface Props {
  setContextValue: Function;
}

const FlashMessage: React.FC<Props> = ({ setContextValue }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType>(null);

  const removeMessageAfterTimeout = () => {
    timeoutId = setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
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

  useEffect(() => {
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let backgroundColor = '';

  if (type === 'error') {
    backgroundColor = colors.error;
  } else if (type === 'info') {
    backgroundColor = colors.info;
  } else if (type === 'success') {
    backgroundColor = colors.success;
  }

  if (!message) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  message: {
    color: colors.white,
    fontSize: 16,
  },
});

export default FlashMessage;
