const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell',
  remotes: {
    'microfrontend-one': 'http://localhost:4201/remoteEntry.json'
  },
  shared: {
    ...shareAll({ 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: 'auto' 
    }),
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    '@angular-devkit/build-angular',
    '@angular-devkit/core',
    '@angular-devkit/schematics',
    '@angular/cli',
    '@angular/compiler-cli',
    '@angular/language-service',
    '@angular/animations/browser',
    '@angular/platform-browser/animations',
    'zone.js/dist/zone-testing',
    'jest-preset-angular',
    'ts-jest',
    'jest',
    '@nx/angular',
    '@nx/webpack',
    '@nx/jest',
    '@nx/eslint',
    '@nx/workspace',
    'typescript',
    'tslib',
    'webpack',
    'webpack-dev-server',
  ]
});