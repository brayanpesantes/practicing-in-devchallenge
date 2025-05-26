// Optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Polyfill for TextEncoder and TextDecoder if not available (for some environments)
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// Mock for `cn` utility if it's simple. If complex, it might need a more specific mock.
jest.mock('@/utils/cn', () => ({
  __esModule: true,
  default: (inputs) => {
    if (Array.isArray(inputs)) {
      return inputs
        .filter(Boolean)
        .map((input) => {
          if (typeof input === 'string') return input;
          if (typeof input === 'object' && input !== null) {
            return Object.entries(input)
              .filter(([, value]) => Boolean(value))
              .map(([key]) => key)
              .join(' ');
          }
          return '';
        })
        .join(' ')
        .trim();
    }
    return inputs || '';
  },
}));

// Mock for Heroicons (if used directly, otherwise mock the specific components)
// Example: jest.mock('@heroicons/react/solid', () => ({ CheckIcon: () => <svg data-testid="check-icon" /> }));

// Mock for use-debounce if causing issues in tests, though direct testing of its effects is better.
// jest.mock('use-debounce', () => ({
//   useDebounce: (value) => [value], // Immediately returns the value for tests
// }));

// Mock for dayjs and its plugins if they cause issues in tests
jest.mock('dayjs', () => {
  const dayjs = jest.requireActual('dayjs');
  // Mock specific plugins if they are problematic or rely on system time in a way that makes tests flaky
  // For example, relativeTime might be mocked if exact output is hard to control.
  // dayjs.extend(jest.requireActual('dayjs/plugin/relativeTime')); // Keep if needed
  return dayjs;
});

// Any other global setup can go here
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
};
