module.exports = {
  displayName: 'lint',
  runner: 'jest-runner-tslint',
  moduleFileExtensions: [
    'ts'
  ],
  testMatch: [
    '<rootDir>/src/**/*.ts'
  ],
  testEnvironment: 'node',
};
