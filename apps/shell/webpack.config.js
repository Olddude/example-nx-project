const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');

module.exports = withModuleFederation({
  ...config,
  remotes: ['microfrontend-one'],
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
