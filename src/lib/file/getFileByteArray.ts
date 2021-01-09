import { decode as atob } from 'base-64';

export default function (base64File: string) {
  const byteCharacters = atob(base64File);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Uint8Array(byteNumbers);
}
