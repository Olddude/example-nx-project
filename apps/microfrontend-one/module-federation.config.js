module.exports = {
  name: 'microfrontend-one',
  exposes: {
    './Routes': 'apps/microfrontend-one/src/app/remote-entry/entry.routes.ts',
  },
};
