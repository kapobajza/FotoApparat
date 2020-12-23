import React, { useContext, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View, Image } from 'react-native';
import { statusCodes } from '@react-native-community/google-signin';

import { AuthService } from '../services';

import { colors, containerStyles } from '../styles';
import { Description } from '../Components/Text';
import { useLoading } from '../ComponentLibrary/Loading';
import { useFlashMessage } from '../ComponentLibrary/FlashMessage';
import { AuthContext, AuthContextType } from '../contexts';
import { GoogleSignInButton } from '../Components/Button';

export default function WelcomeScreen() {
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useFlashMessage();
  const authContext = useContext<AuthContextType>(AuthContext);

  const onGSignInPress = useCallback(async () => {
    try {
      startLoading();
      await AuthService.googleSignIn();
      authContext.setIsSignedIn(true);
    } catch (err) {
      if (err?.code !== statusCodes.SIGN_IN_CANCELLED) {
        showError(err);
      }
    } finally {
      stopLoading();
    }
  }, [authContext, showError, startLoading, stopLoading]);

  return (
    <SafeAreaView style={containerStyles.fill}>
      <ImageBackground
        style={containerStyles.fill}
        source={require('../../assets/images/nature.gif')}
        resizeMode="cover">
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../assets/images/icon-transparent.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Description>
              Shoot fascinating photos, rate them and they will be automatically saved to your
              Google Drive account and ordered accordingly!
            </Description>
          </View>
          <GoogleSignInButton onPress={onGSignInPress} />
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
  logo: {
    height: 80,
    alignSelf: 'center',
  },
});
