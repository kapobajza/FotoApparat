import axios from 'axios';

import StorageService from './StorageService';
import { config, EnvironmentType } from '../config';

const ApiServiceInstance = axios.create({
  baseURL: config.API_BASE_URL,
});

const currentEnvironment = config.ENVIRONMENT as EnvironmentType;

ApiServiceInstance.interceptors.request.use(async (cfg) => {
  const token = await StorageService.getAuthToken();

  if (token) {
    cfg.headers.authorization = `Bearer ${token}`;
  }

  return cfg;
});

ApiServiceInstance.interceptors.response.use((response) => {
  if (
    config.LOG_API_REQUESTS &&
    (currentEnvironment === 'local' || currentEnvironment === 'development')
  ) {
    console.log('response', response);
  }

  return response?.data ?? response;
});

export default ApiServiceInstance;
