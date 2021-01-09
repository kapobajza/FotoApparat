import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, iconShadows } from '../../styles';

interface Props {
  onPress(): void;
  loading: boolean;
}

const ShootPictureButton: React.FC<Props> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={loading}>
      <Icon
        name="camera"
        size={60}
        color={loading ? colors.gray500 : colors.white}
        style={iconShadows.black}
      />
    </TouchableOpacity>
  );
};

export default ShootPictureButton;
