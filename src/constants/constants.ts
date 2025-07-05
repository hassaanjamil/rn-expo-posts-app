import { ENV, API_URL } from '@env';

export const LANGUAGE_KEY = 'language';

export const BASE_URL = ENV === 'DEV' ? API_URL : API_URL;