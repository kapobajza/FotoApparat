import store from 'react-native-simple-store';

const GOOGLE_ACCESS_TOKEN_KEY = 'google_access_token';

export default class StorageService {
  static getGoogleAccessToken = async (): Promise<string> => {
    const data = store.get(GOOGLE_ACCESS_TOKEN_KEY);
    return data || '';
  };

  static setGoogleAccessToken = async (accessToken: string) => {
    await store.save(GOOGLE_ACCESS_TOKEN_KEY, accessToken);
  };

  static deleteGoogleAccessToken = async () => {
    await store.delete(GOOGLE_ACCESS_TOKEN_KEY);
  };

  static clear = async () => {
    await StorageService.deleteGoogleAccessToken();
  };
}
