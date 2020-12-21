import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

import { Text } from '../../ComponentLibrary/Text';
import { colors } from '../../styles';

interface Props {
  title: string;
  onPress: (event?: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  loading,
  disabled,
  containerStyle,
  textStyle,
  activeOpacity,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}
      activeOpacity={activeOpacity || 0.5}>
      {loading ? <ActivityIndicator /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray700,
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: colors.gray700,
  },
});
