module.exports = {
  displayName: 'unit test',
  testMatch: ['<rootDir>/src/fp/**/?(*.)+(test).ts'],
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/testOutput/', '<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/testOutput/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/fp/**/*.ts', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: '<rootDir>/testOutput/unit/coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  reporters: ['default', 'jest-stare'],
  watchPlugins: [
    [
      'jest-watch-suspend',
      {
        key: 's',
        prompt: 'suspend watch mode',
        'suspend-on-start': false,
      },
    ],
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', '.'],
};
