module.exports = {
  // projects: [
  //   {
      displayName: 'test',
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
    // },
    // {
    //   displayName: 'lint',
    //   runner: 'jest-runner-tslint',
    //   moduleFileExtensions: [
    //     'ts'
    //   ],
    //   testMatch: [
    //     'index.ts',
    //     'src/**/*.ts'
    //   ],
    //   watchPathIgnorePatterns: [
    //     '<rootDir>/lib/',
    //     '<rootDir>/testOutput/',
    //     '<rootDir>/node_modules/'
    //   ],
    //   testPathIgnorePatterns: [
    //     '<rootDir>/lib/',
    //     '<rootDir>/testOutput/',
    //     '<rootDir>/node_modules/'
    //   ]
    // }
  // ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
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
  coverageDirectory: 'testOutput/coverage',
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
    ['jest-watch-select-projects', {
      key: 'r',
      prompt: 'select a project'
    }],
    ['jest-watch-directories', { directories: ['src/*'] }],
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
