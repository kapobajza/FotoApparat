import { GoogleSignin } from '@react-native-community/google-signin';
import axios from 'axios';

import StorageService from './storage-service';

import { AppConfig } from '../config';

const GoogleDriveService = axios.create({
  baseURL: AppConfig.GOOGLE_DRIVE_API_URL,
});

GoogleDriveService.interceptors.request.use(async (cfg) => {
  const token = await StorageService.getGoogleAccessToken();

  if (token) {
    cfg.headers.authorization = `Bearer ${token}`;
  }

  return cfg;
});

GoogleDriveService.interceptors.response.use(
  (response) => response.data || response,
);

export interface GoogleDriveFile {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
}

export default class GoogleService {
  static signIn = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();

    const { accessToken } = await GoogleSignin.getTokens();
    await StorageService.setGoogleAccessToken(accessToken);
  };

  static signInSilently = async (): Promise<void> => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signInSilently();
    const { accessToken } = await GoogleSignin.getTokens();
    await StorageService.setGoogleAccessToken(accessToken);
  };

  static signOut = async (): Promise<void> => {
    await GoogleSignin.signOut();
  };

  static getFolderByName = async (
    name: string,
  ): Promise<GoogleDriveFile | null> => {
    const { files } = await GoogleDriveService.get(
      `files?q=name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    );

    return files[0] ?? null;
  };
}
