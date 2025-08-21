const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');

// For production builds, we need to configure the remote URLs
const remoteBaseUrl = process.env.PRODUCTION === 'true'
  ? 'http://microfrontend-one:4201'
  : 'http://localhost:4201';

module.exports = withModuleFederation({
  ...config,
  remotes: [
    ['microfrontend-one', remoteBaseUrl]
  ],
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@example-nx-project/angular-shared') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto'
      };
    }
    return defaultConfig;
  }
});
