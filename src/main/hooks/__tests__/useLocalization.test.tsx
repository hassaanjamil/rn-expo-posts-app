import { act, renderHook, waitFor } from '@testing-library/react-native';

jest.mock('@/main/localization/i18n', () => ({
  language: 'en',
  options: { resources: { en: {}, tr: {} } },
  changeLanguage: jest.fn().mockResolvedValue(undefined),
}));

const i18nMock = jest.requireMock('@/main/localization/i18n') as {
  language: string;
  options: { resources: Record<string, unknown> };
  changeLanguage: jest.Mock<Promise<void>, [string]>;
};

const asyncStorage = jest.requireMock('@react-native-async-storage/async-storage') as {
  getItem: jest.Mock;
  setItem: jest.Mock;
};

const { useLocalization } = require('../useLocalization') as typeof import('../useLocalization');

describe('useLocalization', () => {
  beforeEach(() => {
    i18nMock.language = 'en';
    i18nMock.changeLanguage.mockClear();
    asyncStorage.getItem.mockReset();
    asyncStorage.setItem.mockReset();
  });

  it('returns current language and available languages', () => {
    asyncStorage.getItem.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useLocalization());

    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.availableLanguages).toEqual(['en', 'tr']);
  });

  it('loads persisted language on mount', async () => {
    asyncStorage.getItem.mockResolvedValueOnce('tr');

    const { result } = renderHook(() => useLocalization());

    await waitFor(() => expect(result.current.currentLanguage).toBe('tr'));
    expect(i18nMock.changeLanguage).toHaveBeenCalledWith('tr');
  });

  it('changes language and persists selection', async () => {
    asyncStorage.getItem.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useLocalization());

    await act(async () => {
      await result.current.changeLanguage('tr');
    });

    expect(i18nMock.changeLanguage).toHaveBeenCalledWith('tr');
    expect(asyncStorage.setItem).toHaveBeenCalledWith('language', 'tr');
    expect(result.current.currentLanguage).toBe('tr');
  });
});
