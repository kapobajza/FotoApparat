import { StyleSheet } from 'react-native';

import { ContainerStylesType } from './types';

export default StyleSheet.create<ContainerStylesType>({
  fill: {
    flex: 1,
  },
  fillAndCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFillAndCenter: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
