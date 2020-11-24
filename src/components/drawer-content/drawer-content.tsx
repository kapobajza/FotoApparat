import React, { useContext } from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { GoogleService } from '../../services';

import { DrawerButton } from '../../components/button';
import { useFlashMessage } from '../../custom-lib/flash-message';
import { useLoading } from '../../custom-lib/loading';
import AuthContext from '../../contexts/auth-context';
import FolderButton from './folder-button';

const DrawerContent: React.FC<DrawerContentComponentProps<
  DrawerContentOptions
>> = (props) => {
  const authContext = useContext(AuthContext);
  const { showError } = useFlashMessage();
  const { startLoading, stopLoading } = useLoading();

  const onYessPress = async () => {
    try {
      startLoading();
      await GoogleService.signOut();
      authContext.setIsSignedIn(false);
    } catch (err) {
      showError(err);
    } finally {
      stopLoading();
    }
  };

  const onSignOutPress = () => {
    Alert.alert('Are you sure?', 'Do you really want to sign out', [
      { text: 'Yes', onPress: onYessPress },
      { text: 'No' },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/icon-transparent.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <FolderButton />
        <DrawerButton
          title="Sign out"
          iconName="sign-out"
          iconSize={20}
          onPress={onSignOutPress}
        />
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
