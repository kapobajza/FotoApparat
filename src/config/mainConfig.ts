import config from './config';

const mainConfig = {
  ANDROID_WEB_CLIENT_ID: '810464946765-ivshk0tp68eqttkbummj9dbejeji2cks.apps.googleusercontent.com',
  GOOGLE_DRIVE_API_URL: 'https://content.googleapis.com/drive/v3/',
  GOOGLE_DRIVE_UPLOAD_URL: 'https://content.googleapis.com/upload/drive/v3/',
  GOOGLE_DRIVE_FOLDER_NAME: 'FotoApparat',
  GOOGLE_SCOPES: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
  ],
  LOG_API_REQUESTS: true,
};

export default {
  ...mainConfig,
  ...config,
};
