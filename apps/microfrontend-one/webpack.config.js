const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  plugins: [
    new ModuleFederationPlugin({
      name: "microfrontendOne",
      filename: "remoteEntry.js",
      exposes: {
        "./Routes": "./src/app/remote-entry/entry.routes.ts",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "rxjs": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "zone.js": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      },
    }),
  ],
};