# Verdaccio Local NPM Registry

This guide explains how to use the local Verdaccio registry for managing and publishing packages in this Nx monorepo.

## Overview

Verdaccio is a lightweight private npm proxy registry that allows you to:

- Publish packages locally for testing
- Host private packages
- Cache npm packages for faster installations
- Test package publishing before releasing to npm

## Prerequisites

- Node.js and npm installed
- All project dependencies installed (`npm install`)

## Detailed Steps

### 1. Start Verdaccio Server

Start the Verdaccio server which will host your private registry:

```bash
npm run verdaccio
```

This will:

- Start Verdaccio on <http://localhost:4873/>
- Use the configuration from `verdaccio-local.yaml`
- Store packages in `.verdaccio/storage/`
- Keep the server running (leave this terminal open)

### 2. Build Packages

Build all packages in the monorepo:

```bash
# Development build
npm run build

# Production build
npm run build:prod
```

### 3. Publish Packages

Publish packages to your local Verdaccio registry:

```bash
npm run publish:local
```

This will publish:

- `@olddude/angular-shared`
- `@olddude/angular-auth-shared`

### 6. View Published Packages

Open your browser and navigate to:

```bash
open http://localhost:4873/
```

## Working with Published Packages

### Installing from Local Registry

Once packages are published to your local Verdaccio, you can install them in other projects:

```bash
# Make sure npm is pointing to local registry
npm config set registry http://localhost:4873/

# Install packages
npm install @olddude/angular-shared
npm install @olddude/angular-auth-shared
```

### Version Management

Update package versions before publishing:

```bash
# Patch version (0.0.x)
npm run patch

# Minor version (0.x.0)
npm run minor

# Major version (x.0.0)
npm run major
```

## Directory Structure

```bash
.verdaccio/
└── storage/
    ├── @olddude/
    │   ├── angular-shared/
    │   └── angular-auth-shared/
    └── .verdaccio-db.json
```

## Additional Resources

- [Verdaccio Documentation](https://verdaccio.org/docs/what-is-verdaccio)
- [Nx Documentation](https://nx.dev)
- [NPM Registry Documentation](https://docs.npmjs.com/cli/v8/using-npm/registry)
