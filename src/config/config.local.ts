import { EnvironmentType } from './types';

interface IPJSONData {
  ip_address: string;
}

const { ip_address }: IPJSONData = require('./ip');
const ENVIRONMENT: EnvironmentType = 'local';

export default {
  API_BASE_URL: `http://${ip_address}:3000/api/v1/`,
  ENVIRONMENT,
};
