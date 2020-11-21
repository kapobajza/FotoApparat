import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageType, FlashMessageContextType } from './types';
import { colors } from '../../styles';
import { Text } from '../../components/text';
import FlashMessageState from './state';

let timeoutId: any = null;

interface Props {
  setContextValue: Function;
  timeout: number;
}

const { Value, timing } = Animated;

const FlashMessage: React.FC<Props> = ({ setContextValue, timeout }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType>(null);
  const insets = useSafeAreaInsets();

  const { translateY, slideInAnim, slideOutAnim } = useMemo(() => {
    const initalValue = insets.bottom + 100;
    const transY = new Value(initalValue);
    const useNativeDriver = true;
    const duration = 400;

    return {
      translateY: transY,
      slideInAnim: timing(transY, { toValue: 0, useNativeDriver, duration }),
      slideOutAnim: timing(transY, {
        toValue: initalValue,
        useNativeDriver,
        duration,
      }),
    };
  }, []);

  const removeMessageAfterTimeout = () => {
    timeoutId = setTimeout(() => {
      slideOutAnim.start(({ finished }) => {
        if (finished) {
          setMessage(null);
          setType(null);
        }
      });
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
    // Initialize the centralized state
    FlashMessageState.init(contextValue);
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (message) {
      slideInAnim.start();
    }
  }, [message]);

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
    slideOutAnim.start(({ finished }) => {
      if (finished) {
        setMessage(null);
        setType(null);
      }
    });
  };

  return (
    <Animated.View
      style={[
        styles.outerContainer,
        { bottom: insets.bottom + 30, transform: [{ translateY }] },
      ]}>
      <View
        style={[styles.container, styles.horizontalRow, { backgroundColor }]}>
        <View style={[styles.horizontalRow, styles.innerContainer]}>
          {iconName ? (
            <Icon name={iconName} size={25} color={colors.white} />
          ) : null}
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onClosePress} activeOpacity={0.7}>
          <Icon name="times-circle" size={35} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
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
