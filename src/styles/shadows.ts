import { StyleSheet } from 'react-native';

import { TextShadowStylesType } from './types';
import colors from './colors';

export const textShadows = StyleSheet.create<TextShadowStylesType>({
  commonBlack: {
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    elevation: 6,
  },
});

export const iconShadows = StyleSheet.create({
  black: {
    elevation: 6,
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: colors.black,
  },
});
