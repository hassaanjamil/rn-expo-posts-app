import { useMemo } from 'react';
import { Dimensions, PixelRatio, useWindowDimensions } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const roundToNearestPixel = (value: number) =>
  PixelRatio.roundToNearestPixel(value);

export const horizontalScale = (size: number) => {
  const { width } = Dimensions.get('window');
  return roundToNearestPixel((width / guidelineBaseWidth) * size);
};

export const verticalScale = (size: number) => {
  const { height } = Dimensions.get('window');
  return roundToNearestPixel((height / guidelineBaseHeight) * size);
};

export const moderateScale = (size: number, factor = 0.5) => {
  const scaledSize = horizontalScale(size);
  return size + (scaledSize - size) * factor;
};

export const moderateVerticalScale = (size: number, factor = 0.5) => {
  const scaledSize = verticalScale(size);
  return size + (scaledSize - size) * factor;
};

export const scaleFont = (size: number) =>
  roundToNearestPixel(size * PixelRatio.getFontScale());

export const responsiveHitSlop = (size = 12) => {
  const padding = moderateScale(size);
  return {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding,
  };
};

export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

type ResponsiveOptions<T> = {
  phone: T;
  tablet?: T;
  desktop?: T;
};

export const useResponsiveValue = <T,>(options: ResponsiveOptions<T>) => {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    if (width >= breakpoints.desktop && options.desktop !== undefined) {
      return options.desktop;
    }

    if (width >= breakpoints.tablet && options.tablet !== undefined) {
      return options.tablet;
    }

    return options.phone;
  }, [options, width]);
};
