import React, { useMemo, useCallback } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { ModalComponentPropsType } from '../../ComponentLibrary/Modal';
import { sizes, colors } from '../../styles';
import { useFlashMessage } from '../../ComponentLibrary/FlashMessage';
import { StarRating } from '../Ratings';
import { ImageRatingModalParamsType } from './types';

const ImageRatingModal: React.FC<ModalComponentPropsType> = ({
  modal: { getParam, closeModal },
}) => {
  const { showError } = useFlashMessage();

  const { uri, onImageUpload, base64Image } = useMemo<ImageRatingModalParamsType>(() => {
    const uri: string = getParam('uri', undefined);
    const onImageUpload: (
      base64Uri: string,
      rating: number,
    ) => Promise<void> = getParam('onImageUpload', () => {});
    const base64Image = getParam('base64Image', undefined);

    return { uri, onImageUpload, base64Image };
  }, [getParam]);

  const onRateButtonPress = useCallback(
    async (rating: number) => {
      if (rating <= 0) {
        showError({ message: 'Please select a rating first.' });
      } else {
        closeModal();
        await onImageUpload(base64Image ?? '', rating, uri ?? '');
      }
    },
    [closeModal, onImageUpload, showError, base64Image, uri],
  );

  return (
    <View>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      <StarRating onRatePress={onRateButtonPress} />
    </View>
  );
};

export default ImageRatingModal;

const styles = StyleSheet.create({
  image: {
    height: 500,
    width: sizes.windowSize.width - 20,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 30,
  },
});
