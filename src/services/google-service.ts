import { GoogleSignin } from '@react-native-community/google-signin';
import axios from 'axios';
import moment from 'moment';

import StorageService from './storage-service';

import { AppConfig } from '../config';
import { createMultiPartBody, MULTIPART_BOUNDARY } from '../lib/file';
import { MetadataType } from '../lib/file/types';

const GoogleDriveService = axios.create({
  baseURL: AppConfig.GOOGLE_DRIVE_API_URL,
});

GoogleDriveService.interceptors.request.use(async (cfg) => {
  const token = await StorageService.getGoogleAccessToken();

  console.log('token', token);
  if (token) {
    cfg.headers.authorization = `Bearer ${token}`;
  }

  console.log('config', cfg);

  return cfg;
});

GoogleDriveService.interceptors.response.use((response) => response.data || response);

export interface GoogleDriveFileType {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
}

export interface GoogleDriveResponseType {
  kind: string;
  incompleteSearch: boolean;
  files: [GoogleDriveFileType];
}

export interface GoogleDriveRequestBodyType {
  mimeType: string;
  name: string;
  parents?: string[];
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

  static getFolderByName = async (name: string): Promise<GoogleDriveFileType | null> => {
    const { files }: GoogleDriveResponseType = await GoogleDriveService.get(
      `files?q=name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    );

    return files[0] ?? null;
  };

  static createDriveFolder = async (
    name: string,
    parent: string = '',
  ): Promise<GoogleDriveFileType | null> => {
    const body: GoogleDriveRequestBodyType = {
      mimeType: 'application/vnd.google-apps.folder',
      name,
    };

    if (parent) {
      body.parents = [parent];
    }

    const data: GoogleDriveFileType = await GoogleDriveService.post('files?alt=json', body);

    return data ?? null;
  };

  static uploadMultiPartFile = async (
    base64Uri: string,
    metadata: MetadataType = {},
  ): Promise<GoogleDriveFileType | null> => {
    const token = await StorageService.getGoogleAccessToken();
    const multiPartBody = await createMultiPartBody(base64Uri, metadata);

    const { data } = await axios.post(
      `${AppConfig.GOOGLE_DRIVE_UPLOAD_URL}files?uploadType=multipart`,
      multiPartBody,
      {
        headers: {
          'Content-Type': `multipart/related; boundary=${MULTIPART_BOUNDARY}`,
          authorization: `Bearer ${token}`,
          'Content-Length': multiPartBody.length,
        },
      },
    );

    return data ?? null;
  };

  static uploadImageByRating = async (base64Uri: string, rating: number) => {
    const starText = rating === 1 ? 'star' : 'stars';
    const folderName = `${rating}-${starText}-photos`;
    let folder = await GoogleService.getFolderByName(folderName);
    const parentFolder = await GoogleService.getFolderByName(AppConfig.GOOGLE_DRIVE_FOLDER_NAME);

    if (!folder) {
      folder = await GoogleService.createDriveFolder(folderName, parentFolder?.id);
    }

    const fileName = `fotoapparat_${moment().unix()}`;
    return await GoogleService.uploadMultiPartFile(base64Uri, {
      name: fileName,
      parents: [folder?.id ?? ''],
    });
  };
}
