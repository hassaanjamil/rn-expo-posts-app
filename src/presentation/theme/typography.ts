import { Platform } from 'react-native';
import { moderateVerticalScale, scaleFont } from '@/main/utils/PixelUtils';

const baseFontFamily = Platform.select({
  ios: 'NotoSans_400Regular',
  android: 'NotoSans_400Regular',
  default: 'NotoSans_400Regular',
});

const semiBoldFontFamily = Platform.select({
  ios: 'NotoSans_600SemiBold',
  android: 'NotoSans_600SemiBold',
  default: 'NotoSans_600SemiBold',
});

const boldFontFamily = Platform.select({
  ios: 'NotoSans_700Bold',
  android: 'NotoSans_700Bold',
  default: 'NotoSans_700Bold',
});

export const typography = {
  title: {
    fontFamily: boldFontFamily,
    fontSize: scaleFont(23),
    lineHeight: moderateVerticalScale(25),
  },
  subtitle: {
    fontFamily: semiBoldFontFamily,
    fontSize: scaleFont(18),
    lineHeight: moderateVerticalScale(22),
  },
  body: {
    fontFamily: baseFontFamily,
    fontSize: scaleFont(16),
    lineHeight: moderateVerticalScale(20),
  },
  caption: {
    fontFamily: baseFontFamily,
    fontSize: scaleFont(14),
    lineHeight: moderateVerticalScale(20),
  },
  button: {
    fontFamily: semiBoldFontFamily,
    fontSize: scaleFont(16),
    lineHeight: moderateVerticalScale(20),
    textTransform: 'uppercase' as const,
  },
};

export type TypographyKey = keyof typeof typography;
