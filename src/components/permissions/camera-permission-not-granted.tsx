import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '../button';
import { Text } from '../text';
import { showCameraPermissionsAlert } from '../../lib/permissions';
import { PermissionResultType } from '../../lib/permissions/types';
import { containerStyles } from '../../styles';

interface Props {
  result: PermissionResultType;
}

const CameraPermissionNotGranted: React.FC<Props> = ({ result }) => {
  const onGrantPermissionsPress = () => {
    if (result === 'granted') {
    } else {
      showCameraPermissionsAlert();
    }
  };

  const buttonTitle =
    result === 'granted' ? 'Reaload app' : 'Grant permissions';
  const text =
    result === 'granted'
      ? 'Resulsts granted, reload the app'
      : 'You will have to grant camera permissions in order to use this app';

  return (
    <View style={containerStyles.fillAndCenter}>
      <View style={styles.permissionsContainer}>
        <Icon name="camera" size={40} style={styles.permissionsIcon} />
        <Text style={styles.permissionsText}>{text}</Text>
        <Button title={buttonTitle} onPress={onGrantPermissionsPress} />
      </View>
    </View>
  );
};

export default CameraPermissionNotGranted;

const styles = StyleSheet.create({
  permissionsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  permissionsText: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 18,
    lineHeight: 22,
  },
  permissionsIcon: {
    marginBottom: 15,
  },
});
