import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, AppState, AppStateStatus } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import { GoogleService } from '../services';

import { RootStackParamList } from '../router';
import { useLoading } from '../ComponentLibrary/Loading';
import { useModal } from '../ComponentLibrary/Modal';
import { useFlashMessage } from '../ComponentLibrary/FlashMessage';
import { colors, iconShadows, containerStyles } from '../styles';
import {
  checkCameraPermission,
  checkAndRequestCameraPermission,
  PermissionResultType,
} from '../lib/permissions';
import { CameraPermissionsNotGranted } from '../Components/Permissions';
import { DrawerBarsButton } from '../Components/Drawer';
import { TopImageDisplay, ImageRatingModalParamsType } from '../Components/Camera';
import { config } from '../config';
import { generateFileName } from '../lib/file';

interface Props {
  navigation: DrawerNavigationProp<RootStackParamList, 'Camera'>;
}

const CameraScreen: React.FC<Props> = () => {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [imageShootLoading, setImageShootLoading] = useState(false);
  const [cameraPermissionsResult, setCameraPermissionsResult] = useState<PermissionResultType>('');
  const [latestImage, setLatestImage] = useState<TakePictureResponse | undefined>(undefined);
  const { openModal } = useModal();
  const { showError } = useFlashMessage();

  const cameraRef = useRef<RNCamera>(null);
  const insets = useSafeAreaInsets();

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const checkResult = await checkCameraPermission();
        setCameraPermissionsResult(checkResult);
      }

      appState.current = nextAppState;
    };

    const requestCameraPermissions = async () => {
      try {
        startLoading();
        const result = await checkAndRequestCameraPermission();
        setCameraPermissionsResult(result);
      } finally {
        stopLoading();
      }
    };

    requestCameraPermissions();

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [startLoading, stopLoading]);

  const onShootPicPress = useCallback(async () => {
    try {
      setImageShootLoading(true);
      const pic = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: true,
      });

      setLatestImage(pic);
    } finally {
      setImageShootLoading(false);
    }
  }, []);

  const onDisplayImagePress = useCallback(() => {
    const onImageUpload = async (base64Uri: string, rating: number) => {
      try {
        startLoading();
        const parentFolderRes = await GoogleService.getFolderByName(
          config.GOOGLE_DRIVE_FOLDER_NAME,
        );
        const folderRes = await GoogleService.createOrGetFolder(`${rating}`, parentFolderRes?.id);

        await GoogleService.uploadMultiPartFile(base64Uri, {
          parents: [folderRes?.id ?? ''],
          name: generateFileName(),
        });
      } catch (err) {
        showError(err);
      } finally {
        stopLoading();
      }
    };

    openModal<ImageRatingModalParamsType>('ImageRatingModal', {
      uri: latestImage?.uri,
      onImageUpload,
      base64Image: latestImage?.base64 ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestImage?.uri, openModal, latestImage?.base64]);

  const onDisplayRemoveImagePress = useCallback(() => {
    setLatestImage(undefined);
  }, []);

  if (isLoading) {
    return null;
  }

  if (cameraPermissionsResult !== 'granted') {
    return <CameraPermissionsNotGranted result={cameraPermissionsResult} />;
  }

  return (
    <SafeAreaView style={containerStyles.fill}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={[containerStyles.fill, styles.container]}
        captureAudio={false}>
        <View style={[styles.topLeftContainer, { top: 20 + insets.top }]}>
          <DrawerBarsButton />
        </View>
        <View style={[styles.topRightContainer, { top: 20 + insets.top }]}>
          <TopImageDisplay
            uri={latestImage?.uri ?? ''}
            pictureOrientation={latestImage?.pictureOrientation ?? 0}
            onImagePress={onDisplayImagePress}
            onRemoveImagePress={onDisplayRemoveImagePress}
          />
        </View>
        <View style={[styles.bottomContainer, { bottom: 40 + insets?.bottom }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onShootPicPress}
            disabled={imageShootLoading}>
            <Icon
              name="camera"
              size={60}
              color={imageShootLoading ? colors.gray500 : colors.white}
              style={iconShadows.black}
            />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  container: {
    position: 'relative',
  },
  topLeftContainer: {
    position: 'absolute',
    left: 20,
    alignItems: 'center',
  },
  topRightContainer: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
  },
});

export default CameraScreen;
