
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next"; // Only import the default export to avoid confusion with the named export 'use'
import { initReactI18next } from "react-i18next";
import { LANGUAGE_KEY } from "@/constants/constants";
import en from "@/main/localization/locale-json/en.json";
import tr from "@/main/localization/locale-json/tr.json";

const resources = {
  "en": { translation: en },
  "tr": { translation: tr },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  // Detect the device language
  const getDeviceLanguage = (): string => {
    const locales = Localization.getLocales();
    return locales[0]?.languageTag || 'en';
  };

  if (!savedLanguage) {
    savedLanguage = getDeviceLanguage();
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
