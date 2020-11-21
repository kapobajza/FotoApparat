import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

import { colors, containerStyles } from '../styles';
import Text from '../components/text';
import { useFlashMessage } from '../custom-lib/flash-message';
import { useLoading } from '../custom-lib/loading';

export default function WelcomeScreen() {
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  const onGSignInPress = async () => {
    try {
      startLoading();
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
    } catch (err) {
      if (err?.code !== statusCodes.SIGN_IN_CANCELLED) {
        showError(err);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <SafeAreaView style={containerStyles.fill}>
      <ImageBackground
        style={containerStyles.fill}
        source={require('../../assets/images/nature.gif')}
        resizeMode="cover">
        <View style={styles.container}>
          <View>
            <Text style={[styles.header, styles.shadow]}>FotoApparat</Text>
            <Text style={[styles.subtitle, styles.shadow]}>
              Shoot fascinating photos, rate them and they will be automatically
              saved to your Google Drive account and ordered accordingly!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.gSignInContainer}
            activeOpacity={0.7}
            onPress={onGSignInPress}>
            <Image
              source={require('../../assets/images/google-logo.png')}
              style={styles.googleLogo}
              resizeMode="cover"
            />
            <Text style={styles.gSignInText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 35,
  },
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
  shadow: {
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
    marginTop: 20,
    lineHeight: 22,
    marginHorizontal: 20,
  },
});
