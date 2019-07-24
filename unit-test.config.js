module.exports = {
  displayName: 'unit test',
  preset: 'ts-jest',
  testMatch: [
    '**/src/**/?(*.)+(test).ts',
  ],
  testEnvironment: 'node',
  watchPathIgnorePatterns: [
    '<rootDir>/lib/',
    '<rootDir>/testOutput/',
    '<rootDir>/node_modules/'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/lib/',
    '<rootDir>/testOutput/',
    '<rootDir>/node_modules/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/_internals/**/*.ts',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  coverageDirectory: '<rootDir>/testOutput/unit/coverage',
  coverageReporters: [
    "json",
    "lcov",
    "text-summary"
  ],
  reporters: [
    'default',
    'jest-stare'
  ],
  watchPlugins: [
    ['jest-watch-suspend', {
      key: 's',
      prompt: 'suspend watch mode',
      'suspend-on-start': true
    }],
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
