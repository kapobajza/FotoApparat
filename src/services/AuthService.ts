import { GoogleSignin } from '@react-native-community/google-signin';

import ApiService from './ApiService';
import StorageService from './StorageService';
import { hasTokenExpired } from '../lib/token';

export interface GoogleSignInResponseType {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenResponseType {
  token: string;
}

class AuthService {
  async googleSignIn(): Promise<void> {
    await GoogleSignin.hasPlayServices();
    const { serverAuthCode } = await GoogleSignin.signIn();

    const { token, refreshToken } = await ApiService.post<GoogleSignInResponseType>('auth/google', {
      code: serverAuthCode,
    });

    const { accessToken } = await GoogleSignin.getTokens();

    await StorageService.setAuthToken(token);
    await StorageService.setRefreshToken(refreshToken);
    await StorageService.setGoogleAccessToken(accessToken);
  }

  async refreshToken() {
    const refreshToken = await StorageService.getRefreshToken();
    let newToken = await StorageService.getAuthToken();

    if (hasTokenExpired(newToken)) {
      const { token } = await ApiService.post<RefreshTokenResponseType>('auth/refresh-token', {
        refreshToken,
      });

      newToken = token;
      await StorageService.setAuthToken(token);
    }

    return newToken;
  }

  async signOut(): Promise<void> {
    await GoogleSignin.signOut();
    await StorageService.clear();
  }
}

export default new AuthService();
