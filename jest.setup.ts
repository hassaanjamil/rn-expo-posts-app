import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useTheme: () => ({
      dark: false,
      colors: {
        primary: '#000000',
        background: '#ffffff',
        card: '#ffffff',
        text: '#000000',
        border: '#000000',
        notification: '#000000',
      },
    }),
  };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    MaterialIcons: (props: Record<string, unknown>) =>
      React.createElement('Icon', props, props.children),
  };
});

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
