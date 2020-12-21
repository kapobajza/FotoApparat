import { StyleSheet } from 'react-native';

import { TextShadowStylesType } from './types';
import colors from './colors';

export const textShadows = StyleSheet.create<TextShadowStylesType>({
  commonBlackShadow: {
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
