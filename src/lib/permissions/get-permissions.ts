import { Platform, Alert } from 'react-native';
import {
  PERMISSIONS,
  check,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import { PermissionResultType } from './types';

const CAMERA_PERMISSION =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

export const checkAndRequestCameraPermission = async (): Promise<
  PermissionResultType
> => {
  try {
    const checkRes = await check(CAMERA_PERMISSION);

    if (checkRes !== RESULTS.GRANTED) {
      const reqResult = await request(CAMERA_PERMISSION);
      return reqResult;
    }

    return checkRes;
  } catch (err) {
    return RESULTS.DENIED;
  }
};

export const checkCameraPermission = async (): Promise<
  PermissionResultType
> => {
  try {
    const checkRes = await check(CAMERA_PERMISSION);
    return checkRes;
  } catch (err) {
    return RESULTS.DENIED;
  }
};

export const showCameraPermissionsAlert = () => {
  const onGotoSettingsPres = async () => {
    await openSettings();
  };

  Alert.alert(
    'Permissions denied',
    'You will have to enable camera permissions in your phone settings',
    [
      {
        text: 'Go to settings',
        onPress: onGotoSettingsPres,
      },
      { text: 'Cancel' },
    ],
  );
};
