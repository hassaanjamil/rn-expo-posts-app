module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo|expo-router|@expo-google-fonts|@unimodules|unimodules|sentry-expo|native-base|@sentry|react-native-reanimated)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/.expo/', '/build/']
};
