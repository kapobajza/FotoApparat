import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  AppState,
  View,
  TouchableOpacity,
  AppStateStatus,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { CameraPermissionsNotGranted } from '../components/permissions';
import { containerStyles } from '../styles';
import { useLoading } from '../custom-lib/loading';
import { PermissionResultType } from '../lib/permissions/types';
import {
  checkCameraPermission,
  checkAndRequestCameraPermission,
} from '../lib/permissions';
import { colors } from '../styles';
import { RootStackParamList } from '../router/types';
import { useModal } from '../custom-lib/modal';

interface Props {
  navigation: DrawerNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [cameraPermissionsResult, setCameraPermissionsResult] = useState<
    PermissionResultType
  >('');
  const [imageShootLoading, setImageShootLoading] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [latestImage, setLatestImage] = useState<
    TakePictureResponse | undefined
  >(undefined);
  const insets = useSafeAreaInsets();
  const { openModal } = useModal();

  const appState = useRef(AppState.currentState);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const checkResult = await checkCameraPermission();
      setCameraPermissionsResult(checkResult);
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
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
  }, []);

  const cameraRef = useRef<RNCamera>(null);

  const onShootPicPress = async () => {
    try {
      setImageShootLoading(true);
      const data = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setLatestImage(data);
    } finally {
      setImageShootLoading(false);
    }
  };

  const onBarsButtonPress = () => navigation.toggleDrawer();

  if (isLoading) {
    return null;
  }

  let shotImageWidth = 120;
  let shotImageHeight = 200;

  if (
    latestImage?.pictureOrientation === 3 ||
    latestImage?.pictureOrientation === 4
  ) {
    shotImageWidth = 200;
    shotImageHeight = 120;
  }

  const onImagePress = () => openModal('ImageModal', { image: latestImage });

  const MainComponent =
    cameraPermissionsResult === 'granted' ? (
      <RNCamera
        ref={cameraRef}
        style={[containerStyles.fill, styles.container]}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}>
        <View style={[styles.topLeftContainer, { top: 20 + insets.top }]}>
          <TouchableOpacity onPress={onBarsButtonPress}>
            <Icon
              name="bars"
              size={30}
              color={colors.white}
              style={[styles.barsIcon, styles.iconShadowStyle]}
            />
          </TouchableOpacity>
        </View>
        {latestImage?.uri ? (
          <View style={[styles.topRightContainer, { top: 20 + insets.top }]}>
            <TouchableOpacity activeOpacity={0.7} onPress={onImagePress}>
              <Image
                source={{ uri: latestImage?.uri }}
                style={[
                  styles.shotImage,
                  { width: shotImageWidth, height: shotImageHeight },
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onImagePress}>
              <Icon
                name="thumbs-up"
                size={40}
                color={colors.white}
                style={styles.iconShadowStyle}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={[styles.bottomContainer, { bottom: 40 + insets?.bottom }]}>
          <TouchableOpacity
            style={[styles.shootPicButton]}
            activeOpacity={0.7}
            onPress={onShootPicPress}
            disabled={imageShootLoading}>
            <Icon
              name="camera"
              size={60}
              color={imageShootLoading ? colors.gray500 : colors.white}
              style={styles.iconShadowStyle}
            />
          </TouchableOpacity>
        </View>
      </RNCamera>
    ) : (
      <CameraPermissionsNotGranted result={cameraPermissionsResult} />
    );

  return (
    <SafeAreaView style={containerStyles.fill}>{MainComponent}</SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  barsIcon: {
    textShadowColor: colors.black,
  },
  topRightContainer: {
    position: 'absolute',
    right: 20,
  },
  topLeftContainer: {
    position: 'absolute',
    left: 20,
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  container: {
    position: 'relative',
  },
  shootPicButton: {},
  shotImage: {
    width: 120,
    height: 200,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
  },
  iconShadowStyle: {
    elevation: 6,
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 1 },
  },
  loadingContainer: {
    right: 10,
    alignItems: 'center',
    position: 'absolute',
    width: 60,
  },
  uploadText: {
    fontSize: 13,
    color: colors.white,
    textAlign: 'center',
  },
});
