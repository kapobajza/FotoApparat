import { AxiosResponse } from 'axios';

import { config, EnvironmentType } from '../../config';

const currentEnvironment = config.ENVIRONMENT as EnvironmentType;

export default async function (response: AxiosResponse<any>) {
  if (
    config.LOG_API_REQUESTS &&
    (currentEnvironment === 'local' || currentEnvironment === 'development')
  ) {
    console.log('response', response);
  }

  return response?.data ?? response;
}
