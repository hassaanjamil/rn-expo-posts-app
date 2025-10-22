let mockPlatformOS: 'ios' | 'android' = 'ios';

const mockConstantsState: {
  isDevice: boolean;
  expoConfig?: { hostUri?: string | null };
  manifest?: { debuggerHost?: string | null };
  manifest2?: { extra?: { expoClient?: { hostUri?: string | null } } };
} = {
  isDevice: false,
};

jest.mock('@env', () => ({}), { virtual: true });
jest.mock('react-native', () => ({
  Platform: {
    get OS() {
      return mockPlatformOS;
    },
  },
}));
jest.mock('expo-constants', () => mockConstantsState);

const loadBaseUrl = () => {
  jest.resetModules();
  const { BASE_URL } = require('../constants') as typeof import('../constants');
  return BASE_URL;
};

describe('BASE_URL', () => {
  beforeEach(() => {
    mockPlatformOS = 'ios';
    mockConstantsState.isDevice = false;
    mockConstantsState.expoConfig = undefined;
    mockConstantsState.manifest = undefined;
    mockConstantsState.manifest2 = undefined;
  });

  it('selects different base urls for ios and android platforms', () => {
    mockPlatformOS = 'ios';
    const iosBaseUrl = loadBaseUrl();

    mockPlatformOS = 'android';
    const androidBaseUrl = loadBaseUrl();

    expect(iosBaseUrl).not.toBe(androidBaseUrl);
  });

  it('rewrites android base url host when running on device with debugger host available', () => {
    mockPlatformOS = 'android';
    const emulatorUrl = new URL(loadBaseUrl());

    mockPlatformOS = 'android';
    mockConstantsState.isDevice = true;
    mockConstantsState.expoConfig = { hostUri: '192.0.2.10:19000' };

    const deviceUrl = new URL(loadBaseUrl());

    expect(deviceUrl.hostname).toBe('192.0.2.10');
    expect(deviceUrl.protocol).toBe(emulatorUrl.protocol);
    expect(deviceUrl.pathname).toBe(emulatorUrl.pathname);
    expect(deviceUrl.port).toBe(emulatorUrl.port);
  });

  it('falls back to original host when debugger host is unavailable', () => {
    mockPlatformOS = 'android';
    const baseUrlWithoutHost = loadBaseUrl();

    mockPlatformOS = 'android';
    mockConstantsState.isDevice = true;
    mockConstantsState.expoConfig = { hostUri: null };
    mockConstantsState.manifest = { debuggerHost: null };
    mockConstantsState.manifest2 = { extra: { expoClient: { hostUri: null } } };

    const fallbackUrl = loadBaseUrl();

    expect(fallbackUrl).toBe(baseUrlWithoutHost);
  });
});
