export default {
  displayName: 'microfrontend-one-backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/apps/microfrontend-one-backend',
  testMatch: ['<rootDir>/tests/**/*.test.{js,ts}', '<rootDir>/src/**/*.test.{js,ts}'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { 
      tsconfig: '<rootDir>/tsconfig.app.json',
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
  ],
};