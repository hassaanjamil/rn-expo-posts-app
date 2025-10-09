import { API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from 'react-native';

export const LANGUAGE_KEY = 'language';

export const BASE_URL = Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;