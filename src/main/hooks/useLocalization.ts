import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { LANGUAGE_KEY } from '@/constants/constants';
import i18n from '@/main/localization/i18n';

export function useLocalization() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Load language from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage && savedLanguage !== i18n.language) {
        await i18n.changeLanguage(savedLanguage);
        setCurrentLanguage(savedLanguage);
      }
    })();
  }, []);

  // Change language and persist it
  const changeLanguage = useCallback(async (lng: string) => {
    await i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    availableLanguages: Object.keys(i18n.options.resources ?? {}),
  };
}
