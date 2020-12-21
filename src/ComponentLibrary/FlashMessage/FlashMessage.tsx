import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageType, FlashMessageContextType } from './types';
import { colors, sizes } from '../../styles';
import { Text } from '../Text';
import FlashMessageState from './State';

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

  const { translateX, slideInAnim, slideOutAnim } = useMemo(() => {
    const initalValue = -sizes.screenSize.width;
    const transX = new Value(initalValue);
    const useNativeDriver = true;
    const duration = 400;

    return {
      translateX: transX,
      slideInAnim: timing(transX, { toValue: 0, useNativeDriver, duration }),
      slideOutAnim: timing(transX, {
        toValue: initalValue,
        useNativeDriver,
        duration,
      }),
    };
  }, []);

  const removeMessageAfterTimeout = useCallback(() => {
    timeoutId = setTimeout(() => {
      slideOutAnim.start(({ finished }) => {
        if (finished) {
          setMessage(null);
          setType(null);
        }
      });
    }, timeout);
  }, [slideOutAnim, timeout]);

  const contextValue: FlashMessageContextType = useMemo(
    () => ({
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
    }),
    [removeMessageAfterTimeout],
  );

  useEffect(() => {
    // Initialize the centralized state
    FlashMessageState.init(contextValue);
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message) {
      slideInAnim.start();
    }
  }, [message, slideInAnim]);

  const { backgroundColor, iconName } = useMemo(() => {
    let bgColor = '';
    let icon = '';

    if (type === 'error') {
      bgColor = colors.error;
      icon = 'exclamation-circle';
    } else if (type === 'info') {
      bgColor = colors.info;
      icon = 'info-circle';
    } else if (type === 'success') {
      bgColor = colors.success;
      icon = 'check-circle';
    }

    return { backgroundColor: bgColor, iconName: icon };
  }, [type]);

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
      style={[styles.outerContainer, { bottom: insets.bottom + 30, transform: [{ translateX }] }]}>
      <View style={[styles.container, styles.horizontalRow, { backgroundColor }]}>
        <View style={[styles.horizontalRow, styles.innerContainer]}>
          {iconName ? <Icon name={iconName} size={25} color={colors.white} /> : null}
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
