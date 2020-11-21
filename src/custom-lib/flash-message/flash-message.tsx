import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageType, FlashMessageContextType } from './types';
import { colors } from '../../styles';
import Text from '../../components/text';

let timeoutId: any = null;

interface Props {
  setContextValue: Function;
  timeout: number;
}

const FlashMessage: React.FC<Props> = ({ setContextValue, timeout }) => {
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

  useEffect(() => {
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let backgroundColor = '';
  let iconName = '';

  if (type === 'error') {
    backgroundColor = colors.error;
    iconName = 'exclamation-circle';
  } else if (type === 'info') {
    backgroundColor = colors.info;
    iconName = 'info-circle';
  } else if (type === 'success') {
    backgroundColor = colors.success;
    iconName = 'check-circle';
  }

  if (!message) {
    return null;
  }

  const onClosePress = () => {
    clearTimeout(timeoutId);
    setMessage(null);
    setType(null);
  };

  return (
    <View style={[styles.outerContainer, { bottom: insets.bottom + 30 }]}>
      <View
        style={[styles.container, styles.horizontalRow, { backgroundColor }]}>
        <View style={[styles.horizontalRow, styles.innerContainer]}>
          <Icon name={iconName} size={25} color={colors.white} />
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onClosePress} activeOpacity={0.7}>
          <Icon name="times-circle" size={35} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: colors.white,
    fontSize: 16,
    marginHorizontal: 10,
    flex: 1,
    lineHeight: 22,
  },
  outerContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
  },
  innerContainer: {
    flex: 1,
  },
});

export default FlashMessage;
