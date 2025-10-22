import { renderHook } from '@testing-library/react-native';

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn() },
  PixelRatio: {
    roundToNearestPixel: jest.fn((value: number) => Math.round(value * 1000) / 1000),
    getFontScale: jest.fn(() => 1),
  },
  useWindowDimensions: jest.fn(),
}));

const {
  Dimensions,
  PixelRatio,
  useWindowDimensions,
} = jest.requireMock('react-native') as {
  Dimensions: { get: jest.Mock };
  PixelRatio: {
    roundToNearestPixel: jest.Mock;
    getFontScale: jest.Mock;
  };
  useWindowDimensions: jest.Mock;
};

const {
  horizontalScale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  scaleFont,
  responsiveHitSlop,
  useResponsiveValue,
} = require('../PixelUtils') as typeof import('../PixelUtils');

describe('PixelUtils', () => {
  beforeEach(() => {
    Dimensions.get.mockReset();
    PixelRatio.roundToNearestPixel.mockClear();
    PixelRatio.getFontScale.mockClear();
    useWindowDimensions.mockReset();
  });

  it('horizontalScale scales relative to current window width', () => {
    Dimensions.get.mockReturnValue({ width: 750, height: 812 });

    const result = horizontalScale(10);

    expect(result).toBe(20);
  });

  it('verticalScale scales relative to current window height', () => {
    Dimensions.get.mockReturnValue({ width: 375, height: 1624 });

    const result = verticalScale(10);

    expect(result).toBe(20);
  });

  it('moderateScale interpolates between original and scaled size', () => {
    Dimensions.get.mockReturnValue({ width: 750, height: 812 });

    const result = moderateScale(10, 0.5);

    expect(result).toBe(15);
  });

  it('moderateVerticalScale interpolates between original and vertical scale', () => {
    Dimensions.get.mockReturnValue({ width: 375, height: 1624 });

    const result = moderateVerticalScale(10, 0.25);

    expect(result).toBe(12.5);
  });

  it('scaleFont multiplies by font scale and rounds', () => {
    PixelRatio.getFontScale.mockReturnValue(1.5);
    const result = scaleFont(12);

    expect(PixelRatio.roundToNearestPixel).toHaveBeenCalledWith(18);
    expect(result).toBe(18);
  });

  it('responsiveHitSlop returns symmetric padding', () => {
    Dimensions.get.mockReturnValue({ width: 750, height: 812 });

    const result = responsiveHitSlop(10);

    expect(result).toEqual({
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
    });
  });

  it('useResponsiveValue returns phone value by default', () => {
    useWindowDimensions.mockReturnValue({ width: 400, height: 800 });
    const { result } = renderHook(() =>
      useResponsiveValue({ phone: 'phone', tablet: 'tablet', desktop: 'desktop' })
    );

    expect(result.current).toBe('phone');
  });

  it('useResponsiveValue returns tablet value when width >= tablet breakpoint', () => {
    useWindowDimensions.mockReturnValue({ width: 800, height: 800 });
    const { result } = renderHook(() =>
      useResponsiveValue({ phone: 'phone', tablet: 'tablet', desktop: 'desktop' })
    );

    expect(result.current).toBe('tablet');
  });

  it('useResponsiveValue returns desktop value when width >= desktop breakpoint', () => {
    useWindowDimensions.mockReturnValue({ width: 1300, height: 800 });
    const { result } = renderHook(() =>
      useResponsiveValue({ phone: 'phone', tablet: 'tablet', desktop: 'desktop' })
    );

    expect(result.current).toBe('desktop');
  });
});
