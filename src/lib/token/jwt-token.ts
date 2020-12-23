import jwtDecode, { JwtDecodeOptions } from 'jwt-decode';
import moment from 'moment';

export interface TokenType {
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
}

export function decode(token: string, options?: JwtDecodeOptions) {
  const t = jwtDecode(token, options) as TokenType;
  return t;
}

export function hasTokenExpired(token: string) {
  const { exp } = decode(token);

  console.log('exp', exp);
  console.log('moment().unix()', moment().unix());

  if (moment().unix() > exp) {
    return true;
  }

  return false;
}
