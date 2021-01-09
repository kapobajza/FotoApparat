import { AxiosResponse } from 'axios';

import { config, EnvironmentType } from '../../config';

export default async function (response: AxiosResponse<any>) {
  if (
    config.LOG_API_REQUESTS &&
    (config.ENVIRONMENT === EnvironmentType.LOCAL ||
      config.ENVIRONMENT === EnvironmentType.DEVELOPMENT)
  ) {
    console.log('response', response);
  }

  return response;
}
