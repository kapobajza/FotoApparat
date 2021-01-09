import axios from 'axios';

import { config } from '../config';
import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import {
  createMultiPartBody,
  MULTIPART_BOUNDARY,
  MetadataType,
  getFileByteArray,
} from '../lib/file';

const GoogleDriveInstance = axios.create({
  baseURL: config.GOOGLE_DRIVE_API_URL,
});

GoogleDriveInstance.interceptors.request.use(requestInterceptor(true));
GoogleDriveInstance.interceptors.response.use(responseInterceptor);

const GoogleDriveUploadInstace = axios.create({
  baseURL: config.GOOGLE_DRIVE_UPLOAD_URL,
  validateStatus: (number) => number < 400,
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

export interface OnResumableUploadProgressCallback {
  (currentSize: number, maxSize: number): void;
}

class GoogleService {
  getFolderByName = async (name: string): Promise<GoogleDriveFileType | null> => {
    const {
      data: { files },
    } = await GoogleDriveInstance.get<GoogleDriveResponseType>(
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

    const { data } = await GoogleDriveInstance.post<GoogleDriveFileType>('files?alt=json', body);

    return data ?? null;
  };

  createOrGetFolder = async (
    name: string,
    parent: string = '',
  ): Promise<GoogleDriveFileType | null> => {
    let folder = await this.getFolderByName(name);

    if (!folder) {
      folder = await this.createDriveFolder(name, parent);
    }

    return folder;
  };

  uploadMultiPartFile = async (
    base64Uri: string,
    metadata: MetadataType = {},
  ): Promise<GoogleDriveFileType | null> => {
    const multiPartBody = createMultiPartBody(base64Uri, metadata);

    const { data } = await GoogleDriveUploadInstace.post<GoogleDriveFileType>(
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

  uploadResumableFile = async (
    base64Image: string,
    metadata: MetadataType = {},
    onProgress: OnResumableUploadProgressCallback,
  ): Promise<void> => {
    const { headers } = await GoogleDriveUploadInstace.post(
      'files?uploadType=resumable',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': metadata.mimeType,
        },
      },
    );

    const byteArray = getFileByteArray(base64Image);
    const chunkSize = 256 * 1024 * 5;
    const fileSize = byteArray.length;
    const max = Math.ceil(fileSize / chunkSize);
    const isRoundedSize = fileSize % chunkSize === 0;

    for (let i = 0; i < max; i++) {
      const startingChunkIndex = i * chunkSize;
      const endingChunkIndex = !isRoundedSize && i === max - 1 ? fileSize : (i + 1) * chunkSize;

      const imageChunk = byteArray.slice(startingChunkIndex, endingChunkIndex);

      onProgress(startingChunkIndex, fileSize);

      await GoogleDriveUploadInstace.put<GoogleDriveFileType>(headers?.location, imageChunk, {
        headers: {
          'Content-Range': `bytes ${startingChunkIndex}-${endingChunkIndex - 1}/${fileSize}`,
        },
      });
    }

    onProgress(fileSize, fileSize);
  };
}

export default new GoogleService();
