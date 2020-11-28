import React, { useState, useEffect, useMemo, ReactNode, ComponentType } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  NativeEventSubscription,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ModalContextType, StackType, ModalComponentPropsType, ModalPropType } from './types';
import { containerStyles, colors, sizes } from '../../styles';
import ModalState from './state';

interface Props {
  stack: StackType;
  setContextValue: (val: ModalContextType) => void;
}

const { timing, Value } = Animated;

let onBackPressListener: NativeEventSubscription | undefined;

const Modal: React.FC<Props> = ({ stack, setContextValue }) => {
  const insets = useSafeAreaInsets();
  const [activeModal, setActiveModal] = useState<ReactNode | null>(null);
  const { translateY, slideInBottomAnim, slideOutBottomAnim } = useMemo(() => {
    const initialVal = sizes.windowSize.height + insets.bottom;
    const transY = new Value(initialVal);
    const useNativeDriver = true;
    const duration = 400;

    return {
      translateY: transY,
      slideInBottomAnim: timing(transY, {
        toValue: 0,
        useNativeDriver,
        duration,
      }),
      slideOutBottomAnim: timing(transY, {
        toValue: initialVal,
        useNativeDriver,
        duration,
      }),
    };
  }, []);

  const closeModal = () => {
    slideOutBottomAnim.start(({ finished }) => {
      if (finished) {
        setActiveModal(null);
      }
    });
  };

  const contextValue: ModalContextType = {
    openModal: (name, params = {}) => {
      const stackProp = stack[name];

      if (stackProp) {
        const StackComponent: ComponentType<ModalComponentPropsType> = stackProp;

        const modalProps: ModalPropType = {
          getParam: (n, fallback) => params[n] || fallback,
          closeModal,
        };

        setActiveModal(<StackComponent modal={modalProps} />);
      }
    },
    closeModal,
  };

  useEffect(() => {
    ModalState.init(contextValue);
    setContextValue(contextValue);
  }, []);

  useEffect(() => {
    if (activeModal) {
      slideInBottomAnim.start();
    }

    const onBackPress = () => {
      if (activeModal) {
        closeModal();
        return true;
      }

      return false;
    };

    onBackPressListener?.remove();
    onBackPressListener = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      onBackPressListener?.remove();
    };
  }, [activeModal]);

  return (
    <Animated.View
      style={[containerStyles.absoluteFill, styles.root, { transform: [{ translateY }] }]}>
      <View pointerEvents="box-none" style={[containerStyles.absoluteFill, styles.container]}>
        {activeModal}
      </View>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  root: {
    zIndex: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.blackWithTransparency(0.7),
  },
});
