import axios from 'axios';

import { config } from '../config';
import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import { createMultiPartBody, MULTIPART_BOUNDARY, MetadataType } from '../lib/file';

const GoogleDriveInstance = axios.create({
  baseURL: config.GOOGLE_DRIVE_API_URL,
});

GoogleDriveInstance.interceptors.request.use(requestInterceptor(true));
GoogleDriveInstance.interceptors.response.use(responseInterceptor);

const GoogleDriveUploadInstace = axios.create({
  baseURL: config.GOOGLE_DRIVE_UPLOAD_URL,
});

GoogleDriveUploadInstace.interceptors.request.use(requestInterceptor(true));
GoogleDriveUploadInstace.interceptors.response.use(responseInterceptor);

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

class GoogleService {
  getFolderByName = async (name: string): Promise<GoogleDriveFileType | null> => {
    const { files }: GoogleDriveResponseType = await GoogleDriveInstance.get(
      `files?q=name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    );

    return files[0] ?? null;
  };

  createDriveFolder = async (
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

    const data: GoogleDriveFileType = await GoogleDriveInstance.post('files?alt=json', body);

    return data ?? null;
  };

  uploadMultiPartFile = async (
    base64Uri: string,
    metadata: MetadataType = {},
  ): Promise<GoogleDriveFileType | null> => {
    const multiPartBody = createMultiPartBody(base64Uri, metadata);

    const { data } = await GoogleDriveUploadInstace.post(
      'files?uploadType=multipart',
      multiPartBody,
      {
        headers: {
          'Content-Type': `multipart/related; boundary=${MULTIPART_BOUNDARY}`,
          'Content-Length': multiPartBody.length,
        },
      },
    );

    return data ?? null;
  };
}

export default new GoogleService();
