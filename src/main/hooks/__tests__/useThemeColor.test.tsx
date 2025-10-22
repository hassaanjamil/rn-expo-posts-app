import { renderHook } from '@testing-library/react-native';

jest.mock('@/main/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

const { useColorScheme } = jest.requireMock('@/main/hooks/useColorScheme') as {
  useColorScheme: jest.Mock;
};

const { useThemeColor } = require('../useThemeColor') as typeof import('../useThemeColor');

describe('useThemeColor', () => {
  beforeEach(() => {
    useColorScheme.mockReset();
  });

  it('returns provided light color when theme is light', () => {
    useColorScheme.mockReturnValue('light');

    const { result } = renderHook(() =>
      useThemeColor({ light: '#fff', dark: '#000' }, 'text')
    );

    expect(result.current).toBe('#fff');
  });

  it('falls back to palette color when override not provided', () => {
    useColorScheme.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    );

    expect(result.current).toBe('#ECEDEE');
  });
});
