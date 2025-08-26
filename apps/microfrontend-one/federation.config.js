const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'microfrontend-one',
  exposes: {
    './Routes': 'apps/microfrontend-one/src/app/remote-entry/entry.routes.ts',
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
    '@nx/jest',
    '@nx/eslint',
    '@nx/workspace',
    'typescript',
    'tslib',
  ]
});
