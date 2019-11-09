module.exports = {
  displayName: 'functional test',
  testMatch: ['<rootDir>/test/functional/**/?(*.)+(test).ts'],
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/testOutput/', '<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/testOutput/', '<rootDir>/node_modules/'],
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
