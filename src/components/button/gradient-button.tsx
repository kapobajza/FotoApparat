import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '../text';
import { colors } from '../../styles';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const GradientButton: React.FC<Props> = ({
  title,
  onPress,
  loading,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.container, containerStyle]}
      activeOpacity={0.85}>
      <LinearGradient
        colors={[colors.gray100, colors.gray600]}
        style={styles.innerContainer}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  innerContainer: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
});
