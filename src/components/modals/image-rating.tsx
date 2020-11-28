import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ModalComponentPropsType } from '../../custom-lib/modal/types';
import { sizes, colors } from '../../styles';
import { GradientButton } from '../button';
import { useFlashMessage } from '../../custom-lib/flash-message';

interface StarType {
  rating: number;
  isSelected: boolean;
}

const STAR_RATINGS: StarType[] = [
  { rating: 1, isSelected: false },
  { rating: 2, isSelected: false },
  { rating: 3, isSelected: false },
  { rating: 4, isSelected: false },
  { rating: 5, isSelected: false },
];

const initialStarRating: StarType = {
  rating: 0,
  isSelected: false,
};

const ImageRatingModal: React.FC<ModalComponentPropsType> = ({
  modal: { getParam, closeModal },
}) => {
  const [stars, setNewStars] = useState(STAR_RATINGS);
  const [selectedStar, setSelectedStar] = useState<StarType>(initialStarRating);
  const { showError } = useFlashMessage();

  const image: TakePictureResponse = getParam('image', undefined);
  const onImageUpload: (
    base64Uri: string,
    rating: number,
  ) => Promise<void> = getParam('onImageUpload', () => {});

  const onRateButtonPress = async () => {
    if (selectedStar.rating <= 0) {
      showError({ message: 'Please select a rating first.' });
    } else {
      closeModal();
      await onImageUpload(image?.base64 ?? '', selectedStar?.rating);
    }
  };

  const onStarPress = (rating: number) => {
    let newStars: StarType[] = [];
    let clickedStar = stars.find((star) => star.rating === rating);

    if (selectedStar?.rating === clickedStar?.rating && clickedStar.isSelected) {
      newStars = STAR_RATINGS;
      clickedStar = initialStarRating;
    } else {
      newStars = stars.map((star) => ({
        ...star,
        isSelected: rating >= star.rating,
      }));
    }

    setNewStars(newStars);
    setSelectedStar(clickedStar ?? initialStarRating);
  };

  return (
    <View>
      <Image source={{ uri: image?.uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.starsContainer}>
        {stars.map(({ isSelected, rating }) => {
          const onButtonPress = () => onStarPress(rating);

          return (
            <TouchableOpacity key={rating} onPress={onButtonPress} activeOpacity={0.85}>
              <Icon name="star" size={40} color={isSelected ? colors.gold : colors.white} />
            </TouchableOpacity>
          );
        })}
      </View>
      <GradientButton title="Rate" onPress={onRateButtonPress} containerStyle={styles.button} />
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
  button: {
    width: sizes.screenSize.width / 2,
    alignSelf: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
});
