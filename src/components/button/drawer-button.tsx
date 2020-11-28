import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from '../text';
import { colors } from '../../styles';

interface Props {
  title: string;
  iconName: string;
  iconSize?: number;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
}

const DrawerButton: React.FC<Props> = ({ title, iconName, iconSize, onPress, loading }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} color={colors.gray600} size={iconSize || 18} />
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.gray700} />
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 15,
    borderColor: colors.gray300,
    marginBottom: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconContainer: {
    borderRightColor: colors.gray300,
    borderRightWidth: 1,
    paddingVertical: 15,
    width: 50,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
