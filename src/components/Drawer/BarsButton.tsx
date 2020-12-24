import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { colors, iconShadows } from '../../styles';

const BarsButton = () => {
  const navigation = useNavigation();

  const onBarsButtonPress = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  return (
    <TouchableOpacity onPress={onBarsButtonPress}>
      <Icon name="bars" size={30} color={colors.white} style={[iconShadows.black]} />
    </TouchableOpacity>
  );
};

export default BarsButton;
