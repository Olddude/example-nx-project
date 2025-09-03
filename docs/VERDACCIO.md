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

## Quick Start

Run the following commands in order:

```bash
# 1. Start Verdaccio server
npm run verdaccio

# 2. In a new terminal, configure authentication
echo -n 'admin:admin123' | base64 | npm set //localhost:4873/:_authToken /dev/stdin

# 3. Set npm to use local registry
npm run registry:local:on

# 4. Build all packages
npm run build

# 5. Publish packages to local registry
npm run publish:local
```

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

### 2. Configure Authentication

The authentication is pre-configured with an admin user. Run the configuration script:

```bash
echo -n 'admin:admin123' | base64 | npm set //localhost:4873/:_authToken /dev/stdin
```

This script sets up the necessary authentication tokens for publishing packages.

**Default Credentials:**

- Username: `admin`
- Password: `admin123`

### 3. Switch to Local Registry

Point npm to use your local Verdaccio registry instead of the public npm registry:

```bash
npm run registry:local:on
```

To switch back to the public npm registry later:

```bash
npm run registry:local:off
```

### 4. Build Packages

Build all packages in the monorepo:

```bash
# Development build
npm run build

# Production build
npm run build:prod
```

### 5. Publish Packages

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

You'll see the Verdaccio web interface with all published packages.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run verdaccio` | Start Verdaccio server |
| `npm run verdaccio:login` | Login to Verdaccio (interactive) |
| `npm run registry:local:on` | Switch npm to use local registry |
| `npm run registry:local:off` | Switch npm back to public registry |
| `npm run build` | Build all packages (development) |
| `npm run build:prod` | Build all packages (production) |
| `npm run publish:local` | Publish packages to local registry |
| `npm run publish:remote` | Publish packages to remote registry |

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
├── htpasswd           # User authentication file
└── storage/           # Published packages storage
    ├── @olddude/
    │   ├── angular-shared/
    │   └── angular-auth-shared/
    └── .verdaccio-db.json
```

## Security Notes

- The default credentials (admin/admin123) are for local development only
- Never commit `.verdaccio/storage/` or `.verdaccio/htpasswd` with real credentials
- Use environment variables for production credentials
- The `.verdaccio/` directory is already in `.gitignore`

## Additional Resources

- [Verdaccio Documentation](https://verdaccio.org/docs/what-is-verdaccio)
- [Nx Documentation](https://nx.dev)
- [NPM Registry Documentation](https://docs.npmjs.com/cli/v8/using-npm/registry)
