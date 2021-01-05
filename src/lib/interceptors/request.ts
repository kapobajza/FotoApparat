import { AxiosRequestConfig } from 'axios';

import { StorageService } from '../../services';

import { config, EnvironmentType } from '../../config';

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

    if (
      config.LOG_API_REQUESTS &&
      (config.ENVIRONMENT === EnvironmentType.LOCAL ||
        config.ENVIRONMENT === EnvironmentType.DEVELOPMENT)
    ) {
      console.log('request', cfg);
    }

    return cfg;
  };
}
