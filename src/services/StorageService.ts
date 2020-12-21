import store from 'react-native-simple-store';

const GOOGLE_ACCESS_TOKEN_KEY = 'google_access_token';
const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

class StorageService {
  getAuthToken = async (): Promise<string> => {
    const data = store.get(AUTH_TOKEN_KEY);
    return data || '';
  };

  setAuthToken = async (token: string) => {
    await store.save(AUTH_TOKEN_KEY, token);
  };

  deleteAuthToken = async () => {
    await store.delete(AUTH_TOKEN_KEY);
  };

  getRefreshToken = async (): Promise<string> => {
    const data = store.get(REFRESH_TOKEN_KEY);
    return data || '';
  };

  setRefreshToken = async (token: string) => {
    await store.save(REFRESH_TOKEN_KEY, token);
  };

  deleteRefreshToken = async () => {
    await store.delete(REFRESH_TOKEN_KEY);
  };

  getGoogleAccessToken = async (): Promise<string> => {
    const data = store.get(GOOGLE_ACCESS_TOKEN_KEY);
    return data || '';
  };

  setGoogleAccessToken = async (accessToken: string) => {
    await store.save(GOOGLE_ACCESS_TOKEN_KEY, accessToken);
  };

  deleteGoogleAccessToken = async () => {
    await store.delete(GOOGLE_ACCESS_TOKEN_KEY);
  };

  clear = async () => {
    await this.deleteGoogleAccessToken();
    await this.deleteAuthToken();
  };
}

export default new StorageService();
