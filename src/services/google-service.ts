import { GoogleSignin } from '@react-native-community/google-signin';

import StorageService from './storage-service';

export default class GoogleService {
  static signIn = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();

    const { accessToken } = await GoogleSignin.getTokens();
    await StorageService.setGoogleAccessToken(accessToken);
  };
}
