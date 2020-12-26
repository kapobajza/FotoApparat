import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { sizes, colors } from '../../styles';
import { GradientButton } from '../Button';

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

interface Props {
  onRatePress: (rating: number) => void;
}

const StarRating: React.FC<Props> = ({ onRatePress }) => {
  const [stars, setNewStars] = useState(STAR_RATINGS);
  const [selectedStar, setSelectedStar] = useState<StarType>(initialStarRating);

  const onStarPress = useCallback(
    (rating: number) => {
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
    },
    [selectedStar, stars],
  );

  const onRateButtonPress = useCallback(() => {
    onRatePress(selectedStar?.rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRatePress, selectedStar.rating]);

  return (
    <View>
      <View style={styles.starsContainer}>
        {stars.map(({ isSelected, rating }) => {
          const onButtonPress = () => onStarPress(rating);

          return (
            <TouchableOpacity key={rating} onPress={onButtonPress} activeOpacity={0.85}>
              <Icon name="star" size={40} color={isSelected ? colors.gold : colors.white} solid />
            </TouchableOpacity>
          );
        })}
      </View>
      <GradientButton title="Rate" onPress={onRateButtonPress} containerStyle={styles.button} />
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
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
