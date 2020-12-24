// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   AppState,
//   View,
//   TouchableOpacity,
//   AppStateStatus,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { RNCamera, TakePictureResponse } from 'react-native-camera';
// import { DrawerNavigationProp } from '@react-navigation/drawer';

// import { GoogleService } from '../services';

// import { CameraPermissionsNotGranted } from '../components/permissions';
// import { containerStyles } from '../styles';
// import { useLoading } from '../custom-lib/loading';
// import { PermissionResultType } from '../lib/permissions/types';
// import { checkCameraPermission, checkAndRequestCameraPermission } from '../lib/permissions';
// import { colors } from '../styles';
// import { RootStackParamList } from '../router/types';
// import { useModal } from '../custom-lib/modal';
// import { useFlashMessage } from '../custom-lib/flash-message';

// interface Props {
//   navigation: DrawerNavigationProp<RootStackParamList, 'Home'>;
// }

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const [cameraPermissionsResult, setCameraPermissionsResult] = useState<PermissionResultType>('');
//   const [imageShootLoading, setImageShootLoading] = useState(false);
//   const [uploadLoading, setUploadLoading] = useState(false);
//   const { startLoading, stopLoading, isLoading } = useLoading();
//   const [latestImage, setLatestImage] = useState<TakePictureResponse | undefined>(undefined);
//   const insets = useSafeAreaInsets();
//   const { openModal } = useModal();
//   const { showError, showSuccess } = useFlashMessage();

//   const appState = useRef(AppState.currentState);

//   const handleAppStateChange = async (nextAppState: AppStateStatus) => {
//     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//       const checkResult = await checkCameraPermission();
//       setCameraPermissionsResult(checkResult);
//     }

//     appState.current = nextAppState;
//   };

//   useEffect(() => {
//     const requestCameraPermissions = async () => {
//       try {
//         startLoading();
//         const result = await checkAndRequestCameraPermission();
//         setCameraPermissionsResult(result);
//       } finally {
//         stopLoading();
//       }
//     };

//     requestCameraPermissions();

//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, [startLoading, stopLoading]);

//   const cameraRef = useRef<RNCamera>(null);

//   const onShootPicPress = async () => {
//     try {
//       setImageShootLoading(true);
//       const data = await cameraRef.current?.takePictureAsync({
//         quality: 1,
//         base64: true,
//       });
//       setLatestImage(data);
//     } finally {
//       setImageShootLoading(false);
//     }
//   };

//   const onBarsButtonPress = () => navigation.toggleDrawer();

//   if (isLoading) {
//     return null;
//   }

//   let shotImageWidth = 120;
//   let shotImageHeight = 200;

//   if (latestImage?.pictureOrientation === 3 || latestImage?.pictureOrientation === 4) {
//     shotImageWidth = 200;
//     shotImageHeight = 120;
//   }

//   const onImageUpload = async (base64Uri: string, rating: number) => {
//     try {
//       setUploadLoading(true);
//       // await GoogleService.uploadImageByRating(base64Uri, rating);
//       await GoogleService.uploadResumableImage(base64Uri, rating);
//       showSuccess('Uploaded image successfully!');
//     } catch (err) {
//       console.log('error', err);
//       showError(err);
//     } finally {
//       setUploadLoading(false);
//     }
//   };

//   const onImagePress = () => openModal('ImageRatingModal', { image: latestImage, onImageUpload });
//   const onRemoveImagePress = () => setLatestImage(undefined);
//   const onUploadProgressPress = () => openModal('UploadProgressModal');

//   const MainComponent =
//     cameraPermissionsResult === 'granted' ? (
//       <RNCamera
//         ref={cameraRef}
//         style={[containerStyles.fill, styles.container]}
//         type={RNCamera.Constants.Type.back}
//         captureAudio={false}>
//         <View style={[styles.topLeftContainer, { top: 20 + insets.top }]}>
//           <TouchableOpacity onPress={onBarsButtonPress}>
//             <Icon
//               name="bars"
//               size={30}
//               color={colors.white}
//               style={[styles.barsIcon, styles.iconShadowStyle]}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={[styles.uploadContainer, { top: 80 + insets.top }]}>
//           {/* {uploadLoading ? ( */}
//           <TouchableOpacity style={[styles.uploadInnerContainer]} onPress={onUploadProgressPress}>
//             <Icon
//               name="upload"
//               size={30}
//               style={[styles.uploadIcon, styles.iconShadowStyle]}
//               color={colors.white}
//             />
//             <ActivityIndicator color={colors.white} />
//           </TouchableOpacity>
//           {/* ) : null} */}
//         </View>
//         <View style={[styles.topRightContainer, { top: 20 + insets.top }]}>
//           {latestImage?.uri ? (
//             <View style={styles.topImageContainer}>
//               <TouchableOpacity activeOpacity={0.7} onPress={onImagePress}>
//                 <Image
//                   source={{ uri: latestImage?.uri }}
//                   style={[styles.shotImage, { width: shotImageWidth, height: shotImageHeight }]}
//                 />
//               </TouchableOpacity>
//               <View style={styles.topIconsContainer}>
//                 <TouchableOpacity onPress={onImagePress} style={styles.likeIconContainer}>
//                   <Icon
//                     name="thumbs-up"
//                     size={40}
//                     color={colors.white}
//                     style={styles.iconShadowStyle}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onRemoveImagePress}>
//                   <Icon
//                     name="times-circle"
//                     size={40}
//                     color={colors.white}
//                     style={styles.iconShadowStyle}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//         <View style={[styles.bottomContainer, { bottom: 40 + insets?.bottom }]}>
//           <TouchableOpacity
//             style={[styles.shootPicButton]}
//             activeOpacity={0.7}
//             onPress={onShootPicPress}
//             disabled={imageShootLoading}>
//             <Icon
//               name="camera"
//               size={60}
//               color={imageShootLoading ? colors.gray500 : colors.white}
//               style={styles.iconShadowStyle}
//             />
//           </TouchableOpacity>
//         </View>
//       </RNCamera>
//     ) : (
//       <CameraPermissionsNotGranted result={cameraPermissionsResult} />
//     );

//   return <SafeAreaView style={containerStyles.fill}>{MainComponent}</SafeAreaView>;
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   barsIcon: {
//     textShadowColor: colors.black,
//   },
//   topRightContainer: {
//     position: 'absolute',
//     right: 20,
//   },
//   topLeftContainer: {
//     position: 'absolute',
//     left: 20,
//     alignItems: 'center',
//   },
//   bottomContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     left: 0,
//     right: 0,
//   },
//   container: {
//     position: 'relative',
//   },
//   shootPicButton: {},
//   shotImage: {
//     width: 120,
//     height: 200,
//     borderWidth: 2,
//     borderColor: colors.white,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   iconShadowStyle: {
//     elevation: 6,
//     textShadowRadius: 3,
//     textShadowOffset: { width: 1, height: 1 },
//   },
//   loadingContainer: {
//     right: 10,
//     alignItems: 'center',
//     position: 'absolute',
//     width: 60,
//   },
//   uploadText: {
//     fontSize: 13,
//     color: colors.white,
//     textAlign: 'center',
//   },
//   topImageContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   topIconsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   likeIconContainer: {
//     marginRight: 10,
//   },
//   uploadContainer: {
//     position: 'absolute',
//     left: 20,
//     top: 50,
//   },
//   uploadInnerContainer: {
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: colors.blackWithTransparency(0.5),
//     borderRadius: 8,
//   },
//   uploadIcon: {
//     marginBottom: 10,
//   },
// });
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, AppState, AppStateStatus } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RNCamera } from 'react-native-camera';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import { RootStackParamList } from '../router';
import { useLoading } from '../ComponentLibrary/Loading';
import { colors, iconShadows, containerStyles } from '../styles';
import {
  checkCameraPermission,
  checkAndRequestCameraPermission,
  PermissionResultType,
} from '../lib/permissions';
import { CameraPermissionsNotGranted } from '../Components/Permissions';
import { DrawerBarsButton } from '../Components/Drawer';

interface Props {
  navigation: DrawerNavigationProp<RootStackParamList, 'Camera'>;
}

const HomeScreen: React.FC<Props> = () => {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [imageShootLoading, setImageShootLoading] = useState(false);
  const [cameraPermissionsResult, setCameraPermissionsResult] = useState<PermissionResultType>('');
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
      await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: true,
      });
    } finally {
      setImageShootLoading(false);
    }
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
});

export default HomeScreen;
