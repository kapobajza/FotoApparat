import { GoogleSignin } from '@react-native-community/google-signin';

import ApiService from './ApiService';
import StorageService from './StorageService';

export interface GoogleSignInResponseType {
  token: string;
  refreshToken: string;
}

class GoogleService {
  signIn = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices();
    const { serverAuthCode } = await GoogleSignin.signIn();

    const { token, refreshToken } = await ApiService.post<GoogleSignInResponseType>('auth/google', {
      code: serverAuthCode,
    });

    await StorageService.setAuthToken(token);
    await StorageService.setRefreshToken(refreshToken);
  };
}

export default new GoogleService();
