import axios from 'axios';

import { config } from '../config';
import { requestInterceptor, responseInterceptor } from '../lib/interceptors';

const ApiServiceInstance = axios.create({
  baseURL: config.API_BASE_URL,
});

ApiServiceInstance.interceptors.request.use(requestInterceptor());
ApiServiceInstance.interceptors.response.use(responseInterceptor);

export default ApiServiceInstance;
