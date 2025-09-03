# Verdaccio Setup for Standalone Apps

This project has been configured to support standalone applications with local package management via Verdaccio.

## Configuration Overview

### 1. Standalone Apps

Each application now has its own `package.json` file:

- `apps/shell/package.json` - Shell frontend app
- `apps/shell-backend/package.json` - Shell backend app  
- `apps/microfrontend-one/package.json` - Microfrontend One app
- `apps/microfrontend-one-backend/package.json` - Microfrontend One backend

### 2. Shared Libraries

The shared libraries are configured as local packages:

- `@olddude/angular-shared`
- `@olddude/angular-auth-shared`

These are referenced in the root `package.json` using file paths and will be published to Verdaccio for standalone app usage.

### 3. Registry Configuration

- **Production/CI**: Uses GitHub Packages registry (`https://npm.pkg.github.com`)
- **Local Development**: Uses Verdaccio (`http://localhost:4873`)

## Usage Instructions

### Starting Verdaccio

```bash
# Start Verdaccio local registry
npm run verdaccio:start

# Or using Nx directly
npx nx local-registry
```

### Publishing Libraries to Local Registry

```bash
# Switch to local registry, build and publish libraries, then switch back
npm run publish:local

# Or manually:
npm run use-local-registry
npm run publish:libs
npm run use-remote-registry
```

### Using Local Registry for Development

```bash
# Switch to local registry
npm run use-local-registry

# Install packages (will use Verdaccio)
npm install

# Switch back to remote registry when done
npm run use-remote-registry
```

### Building and Running Apps

```bash
# Build all apps
npm run build

# Run specific apps
npm run start:shell
npm run start:microfrontend-one

# The backend apps will start automatically with their frontends
```

## CI/CD Compatibility

The GitHub Actions workflow (`push.yaml`) automatically overrides the registry configuration by setting `registry-url: "https://npm.pkg.github.com"` in the Setup Node step. This ensures:

- Local development uses Verdaccio
- CI/CD uses GitHub Packages
- No conflicts between environments

## Available Scripts

| Script | Description |
|--------|-------------|
| `verdaccio` | Start Verdaccio registry |
| `verdaccio:start` | Start Verdaccio in background |
| `verdaccio:stop` | Stop Verdaccio |
| `use-local-registry` | Switch to local Verdaccio registry |
| `use-remote-registry` | Switch back to GitHub Packages registry |
| `publish:local` | Build and publish libraries to Verdaccio |
| `publish:libs` | Build and publish shared libraries only |

## Troubleshooting

### If Verdaccio is not accessible

1. Ensure Verdaccio is running: `npm run verdaccio:start`
2. Check if port 4873 is available: `lsof -i :4873`
3. Verify `.npmrc` points to local registry: `cat .npmrc`

### If packages are not found

1. Ensure libraries are published: `npm run publish:local`
2. Check Verdaccio UI: <http://localhost:4873>
3. Clear npm cache: `npm cache clean --force`

### To reset to original state

```bash
git checkout .npmrc
npm install
