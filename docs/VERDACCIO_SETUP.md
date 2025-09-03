# Verdaccio Local Registry Setup

This project uses Verdaccio as a local npm registry for development to test publishing packages locally before pushing to GitHub Packages.

## Configuration

- **Verdaccio Config**: `verdaccio-local.yaml` - Main configuration for local Verdaccio instance
- **Default Registry**: `.npmrc` - Points to npm registry (used in CI/CD)
- **Local Registry**: `.npmrc.local` - Points to local Verdaccio for `@olddude` scope

## Publishing Workflow

### Local Development (Verdaccio)

1. Start Verdaccio:

   ```bash
   npm run verdaccio:start
   ```

2. Publish packages to local registry:

   ```bash
   npm run publish:local
   ```

   This script will:
   - Switch to local registry configuration (`.npmrc.local`)
   - Build and publish packages to Verdaccio (using `publish-local` target)
   - Switch back to default registry configuration

3. Stop Verdaccio when done:

   ```bash
   npm run verdaccio:stop
   ```

### CI/CD (GitHub Actions)

The GitHub Actions workflows use the default `.npmrc` configuration:

- **Pull Request** (`pull-request.yaml`): Runs tests and builds only
- **Push to Master** (`push.yaml`):
  - Builds and tests
  - Publishes packages to GitHub Packages registry with `--access public`
  - Creates GitHub release

## Package Targets

Each library has two publish targets:

- `publish`: Used by GitHub Actions, includes `--access public` flag
- `publish-local`: Used for local Verdaccio, no access flag needed

## Switching Between Registries

- **Use local registry**: `npm run use-local-registry`
- **Use remote registry**: `npm run use-remote-registry`

## Verdaccio Features

The local Verdaccio setup (`verdaccio-local.yaml`) is configured for:

- Anonymous publishing (no authentication required)
- Web UI available at <http://localhost:4873>
- Storage in `.verdaccio/storage` directory
- No uplink to npm registry (purely local)
