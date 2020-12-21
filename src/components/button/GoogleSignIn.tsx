import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Text } from '../../ComponentLibrary/Text';
import { colors } from '../../styles';

interface Props {
  onPress: () => void;
}

const GoogleSignInButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.gSignInContainer} activeOpacity={0.7} onPress={onPress}>
      <Image
        source={require('../../../assets/images/google-logo.png')}
        style={styles.googleLogo}
        resizeMode="cover"
      />
      <Text style={styles.gSignInText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  googleLogo: {
    width: 30,
    height: 30,
  },
  gSignInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 4,
    elevation: 6,
  },
  gSignInText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: colors.gray600,
  },
});
