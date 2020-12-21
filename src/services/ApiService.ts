import axios from 'axios';

import StorageService from './StorageService';
import { config } from '../config';

const ApiServiceInstance = axios.create({
  baseURL: config.API_BASE_URL,
});

ApiServiceInstance.interceptors.request.use(async (cfg) => {
  const token = await StorageService.getAuthToken();

  if (token) {
    cfg.headers.authorization = `Bearer ${token}`;
  }

  console.log('config', cfg);

  return cfg;
});

ApiServiceInstance.interceptors.response.use((response) => response?.data ?? response);

export default ApiServiceInstance;
