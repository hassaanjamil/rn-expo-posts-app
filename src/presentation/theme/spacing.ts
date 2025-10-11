import { horizontalScale, moderateScale, verticalScale } from '@/main/utils/PixelUtils';

const BASE_UNIT = 4;

const createSpacing = (multiplier: number) => horizontalScale(BASE_UNIT * multiplier);
const createVerticalSpacing = (multiplier: number) => verticalScale(BASE_UNIT * multiplier);

export const spacingX = {
  none: 0,
  xxs: createSpacing(1),
  xs: createSpacing(2),
  s: createSpacing(3),
  m: createSpacing(4),
  l: createSpacing(5),
  xl: createSpacing(6),
  xxl: createSpacing(8),
};

export const spacingY = {
  none: 0,
  xxs: createVerticalSpacing(1),
  xs: createVerticalSpacing(2),
  s: createVerticalSpacing(3),
  m: createVerticalSpacing(4),
  l: createVerticalSpacing(5),
  xl: createVerticalSpacing(6),
  xxl: createVerticalSpacing(8),
};

export const borderRadius = {
  s: moderateScale(6, 0.3),
  m: moderateScale(12, 0.3),
  l: moderateScale(16, 0.3),
};
