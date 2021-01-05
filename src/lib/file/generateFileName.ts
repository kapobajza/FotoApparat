import moment from 'moment';

import { getRandomInt } from '../random';

export default function () {
  return `${moment().unix()}__${getRandomInt(100000, 999999)}`;
}
