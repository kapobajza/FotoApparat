import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';

import { Text } from '../components/text';
import AuthContext, { AuthContextType } from '../contexts/auth-context';
import { containerStyles } from '../styles';

const HomeScreen = () => {
  const authContext = useContext<AuthContextType>(AuthContext);

  const onLogoutPress = () => {
    authContext.setIsSignedIn(false);
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
