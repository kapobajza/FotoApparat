import React, { useContext, useCallback } from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';

import { DrawerButton } from '../Button';
import { useFlashMessage } from '../../ComponentLibrary/FlashMessage';
import { useLoading } from '../../ComponentLibrary/Loading';
import { AuthContext } from '../../contexts';
import FolderButton from './FolderButton';
import { AuthService } from '../../services';

const DrawerContent: React.FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
  const authContext = useContext(AuthContext);
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  const onYessPress = useCallback(async () => {
    try {
      startLoading();
      await AuthService.signOut();
      authContext.setIsSignedIn(false);
    } catch (err) {
      showError(err);
    } finally {
      stopLoading();
    }
  }, [authContext, showError, startLoading, stopLoading]);

  const onSignOutPress = useCallback(() => {
    Alert.alert('Are you sure?', 'Do you really want to sign out', [
      { text: 'Yes', onPress: onYessPress },
      { text: 'No' },
    ]);
  }, [onYessPress]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/icon-transparent.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <FolderButton />
        <DrawerButton title="Sign out" iconName="sign-out" iconSize={20} onPress={onSignOutPress} />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 25,
    alignSelf: 'center',
  },
});
