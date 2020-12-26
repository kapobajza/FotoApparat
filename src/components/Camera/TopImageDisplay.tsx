import React, { useMemo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, iconShadows } from '../../styles';

interface Props {
  uri: string;
  pictureOrientation: number;
  onImagePress: () => void;
  onRemoveImagePress: () => void;
}

const TopImageDisplay: React.FC<Props> = ({
  uri,
  pictureOrientation,
  onImagePress,
  onRemoveImagePress,
}) => {
  const { shotImageWidth, shotImageHeight } = useMemo(() => {
    let shotImageWidth = 120;
    let shotImageHeight = 200;

    if (pictureOrientation === 3 || pictureOrientation === 4) {
      shotImageWidth = 200;
      shotImageHeight = 120;
    }

    return { shotImageWidth, shotImageHeight };
  }, [pictureOrientation]);

  if (!uri) {
    return null;
  }

  return (
    <View style={styles.topImageContainer}>
      <TouchableOpacity activeOpacity={0.7} onPress={onImagePress}>
        <Image
          source={{ uri }}
          style={[styles.shotImage, { width: shotImageWidth, height: shotImageHeight }]}
        />
      </TouchableOpacity>
      <View style={styles.topIconsContainer}>
        <TouchableOpacity onPress={onImagePress} style={styles.likeIconContainer}>
          <Icon name="thumbs-up" size={40} color={colors.white} style={iconShadows.black} solid />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemoveImagePress}>
          <Icon
            name="times-circle"
            size={40}
            color={colors.white}
            style={iconShadows.black}
            solid
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopImageDisplay;

const styles = StyleSheet.create({
  shotImage: {
    width: 120,
    height: 200,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
  },
  topImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  topIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIconContainer: {
    marginRight: 10,
  },
});
