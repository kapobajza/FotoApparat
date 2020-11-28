export const MULTIPART_BOUNDARY = 'fotoappparat_boundary';
const ddb = `--${MULTIPART_BOUNDARY}`;
const ending = `\n${ddb}--`;

import { MetadataType } from './types';

const createMultiPartBody = async (
  base64Uri: string,
  metadata: MetadataType = {},
  mediaType: string = 'image/jpg',
) => {
  let body =
    `\n${ddb}\n` +
    'Content-Type: application/json; charset=UTF-8\n\n' +
    `${JSON.stringify(metadata)}\n\n${ddb}\n` +
    'Content-Transfer-Encoding: base64\n' +
    `Content-Type: ${mediaType}\n\n`;

  body += `${base64Uri}${ending}`;

  return body;
};

export default createMultiPartBody;
