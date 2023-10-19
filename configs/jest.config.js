module.exports = {
  rootDir: process.cwd(),
  transform: {
    '^.+[.]tsx?$': 'babel-jest',
    '^.+[.]js?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby|lodash-es|ssr-window|uuid)/)'
  ],
  automock: false,
  setupFiles: ['<rootDir>/configs/setup.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/configs/setupTests.js'
  ],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '@components(.*)$': '<rootDir>/src/components/$1',
    '@models(.*)$': '<rootDir>/src/models/$1',
    'styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.browser.cjs.js'
  },
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  coverageReporters: ['json', 'json-summary', 'text', 'html'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx}',
    '!<rootDir>/src/**/*.stories.*',
    '!<rootDir>/src/**/__mocks__/**/*',
    '!<rootDir>/src/**/__tests__/**/*'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/configs/',
    '<rootDir>/node_modules/'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testResultsProcessor: 'jest-sonar-reporter',
  globals: {
    __PATH_PREFIX__: ''
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/__tests__/*',
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  testPathIgnorePatterns: ['node_modules', '.cache', '<rootDir>/template/'],
  verbose: false
}
