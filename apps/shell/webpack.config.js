const { withModuleFederation } = require('@nx/angular/module-federation');
const config = require('./module-federation.config');

module.exports = withModuleFederation({
  ...config,
  remotes: ['mfe1'],
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@example-nx-project/shared/ui' || 
        libraryName === '@example-nx-project/shared/data-access') {
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
