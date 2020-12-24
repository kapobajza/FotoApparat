import React, { ReactNode } from 'react';
import { StyleSheet, TextStyle } from 'react-native';

import { Text } from '../../ComponentLibrary/Text';
import { textShadows, colors } from '../../styles';

interface Props {
  children: ReactNode;
  style?: TextStyle;
}

const Description: React.FC<Props> = ({ children, style }) => {
  return <Text style={[textShadows.commonBlack, styles.text, style]}>{children}</Text>;
};

export default Description;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    marginTop: 20,
    lineHeight: 22,
    marginHorizontal: 20,
  },
});
