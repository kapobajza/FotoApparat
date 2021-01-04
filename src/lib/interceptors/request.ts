import { AxiosRequestConfig } from 'axios';

import { StorageService } from '../../services';

export default function (isGoogleService = false) {
  return async (cfg: AxiosRequestConfig) => {
    let token = null;

    if (isGoogleService) {
      token = await StorageService.getGoogleAccessToken();
    } else {
      token = await StorageService.getAuthToken();
    }

    if (token) {
      cfg.headers.authorization = `Bearer ${token}`;
    }

    return cfg;
  };
}
