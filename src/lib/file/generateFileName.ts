import moment from 'moment';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function () {
  return `${moment().unix()}__${getRandomInt(100000, 999999)}`;
}
