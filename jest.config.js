module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle CSS imports (if you use them)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(gif|ttf|eot|svg|png|webp)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases (if you have them in tsconfig.json)
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/images/(.*)$': '<rootDir>/images/$1', // Added for images if needed by tests
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  // A map from regular expressions to paths to transformers
  // Use ts-jest for ts/tsx files
  // preset: 'ts-jest', // ts-jest is an alternative to babel-jest for TS
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Separate tsconfig for tests if needed
    },
  },
  // Automatically create a tsconfig.jest.json if not present
  // setupFiles: ['./jest.setup.ts'] // if jest.setup.js is ts
};
