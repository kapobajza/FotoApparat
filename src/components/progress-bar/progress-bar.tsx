import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Animated, LayoutChangeEvent } from 'react-native';

import { colors } from '../../styles';

interface Props {
  value: number;
}

const { Value, timing } = Animated;

const ProgressBar: React.FC<Props> = ({ value }) => {
  const [maxValue, setMaxValue] = useState(0);

  const { translateX } = useMemo(
    () => ({
      translateX: new Value(-maxValue),
    }),
    [],
  );

  const { animation } = useMemo(() => {
    const val = value > 100 ? 100 : value;
    const toValue = (maxValue * val) / 100 - maxValue;

    return {
      translateX,
      animation: timing(translateX, { toValue, duration: 700, useNativeDriver: true }),
    };
  }, [value, maxValue]);

  useEffect(() => {
    if (maxValue !== 0) {
      animation.start();
    }
  }, [value]);

  const onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => setMaxValue(width);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Animated.View style={[styles.bar, { transform: [{ translateX }] }]} onLayout={onLayout} />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.gray400,
    borderRadius: 10,
    flex: 1,
  },
  container: {
    backgroundColor: colors.gray700,
    height: 20,
    borderRadius: 10,
    position: 'relative',
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
