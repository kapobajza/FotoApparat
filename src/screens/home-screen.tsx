import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';

import { GoogleService } from '../services';

import { Text } from '../components/text';
import AuthContext, { AuthContextType } from '../contexts/auth-context';
import { containerStyles } from '../styles';
import { useFlashMessage } from '../custom-lib/flash-message';

const HomeScreen = () => {
  const authContext = useContext<AuthContextType>(AuthContext);
  const { showError } = useFlashMessage();

  const onLogoutPress = async () => {
    try {
      await GoogleService.signOut();
      authContext.setIsSignedIn(false);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <SafeAreaView style={containerStyles.fillAndCenter}>
      <Text style={styles.text}>Home screen</Text>
      <Button title="Log out" onPress={onLogoutPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {},
});
