import { StyleSheet, ViewStyle } from 'react-native';

export interface ContainerStyleType {
  fill: ViewStyle;
  fillAndCenter: ViewStyle;
  absoluteFillAndCenter: ViewStyle;
}

export default StyleSheet.create<ContainerStyleType>({
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
});
