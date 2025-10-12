import { API_URL_IOS, API_URL_ANDROID } from '@env';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const LANGUAGE_KEY = 'language';
export const AUTH_STORAGE_KEY = 'auth:isLoggedIn';
export const FAVORITE_POSTS_KEY = 'posts:favorite';

const getDebuggerHost = () => {
  const expoConfigHost = Constants.expoConfig?.hostUri;
  const manifestHost = Constants.manifest?.debuggerHost;
  const manifest2Host = (Constants as any)?.manifest2?.extra?.expoClient?.hostUri;

  const host = expoConfigHost ?? manifestHost ?? manifest2Host;

  if (!host) {
    return null;
  }

  return host.split(':')[0] ?? null;
};

const rewriteBaseUrlHost = (baseUrl: string, host: string | null) => {
  if (!host) {
    return baseUrl;
  }

  try {
    const url = new URL(baseUrl);
    url.hostname = host;
    return url.toString();
  } catch {
    return baseUrl;
  }
};

const resolveAndroidBaseUrl = () => {
  if (!Constants.isDevice) {
    // Android emulator case (10.0.2.2 style) still uses the configured env value.
    return API_URL_ANDROID;
  }

  const debuggerHost = getDebuggerHost();
  return rewriteBaseUrlHost(API_URL_ANDROID, debuggerHost);
};

export const BASE_URL =
  Platform.OS === 'android'
    ? resolveAndroidBaseUrl()
    : API_URL_IOS;
