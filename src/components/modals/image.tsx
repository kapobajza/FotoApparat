import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';

import { ModalComponentPropsType } from '../../custom-lib/modal/types';
import { sizes, colors } from '../../styles';

const ImageModal: React.FC<ModalComponentPropsType> = ({
  modal: { getParam },
}) => {
  const image: TakePictureResponse = getParam('image', undefined);

  return (
    <View>
      <Image
        source={{ uri: image?.uri }}
        style={styles.image}
        resizeMode="contain"
      />
      {/* <StarRating image={image} /> */}
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  image: {
    height: 500,
    width: sizes.windowSize.width - 20,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 20,
  },
});
