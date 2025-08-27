export default {
  displayName: 'shell-backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/apps/shell-backend',
  testMatch: ['<rootDir>/tests/**/*.test.{js,ts}', '<rootDir>/src/**/*.test.{js,ts}'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { 
      tsconfig: '<rootDir>/tsconfig.app.json',
    }],
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
  ],
};