# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Codebase Overview

This is an Nx monorepo workspace configured for Angular Module Federation. The architecture follows a micro-frontend pattern with a shell (host) application that can load remote micro-frontends at runtime.

### Architecture

- **Shell App** (`apps/shell/`): Main host application with Angular SSR enabled, serves as the container for micro-frontends
- **Module Federation**: Configured via webpack to enable runtime loading of remote applications
- **Shared Libraries**: Path mappings configured for `@example-nx-project/shared/*` libraries (to be created as needed)

## Essential Commands

```bash
# Development
npx nx serve shell                    # Start development server
npm start                             # Serve shell with mfe1 as dev remote

# Testing
npx nx test shell                     # Run unit tests
npx nx e2e shell-e2e                  # Run E2E tests with Playwright
npm run test:ci                       # CI mode with coverage

# Building
npx nx build shell                    # Development build
npx nx build shell --configuration=production  # Production build with SSR

# Code Quality
npx nx lint shell                     # Run ESLint
npm run lint                          # Lint all projects
npx nx graph                          # View dependency graph

# Working with affected projects (for CI/optimization)
npm run affected:build --base=main    # Build only changed projects
npm run affected:test --base=main     # Test only changed projects
```

## Module Federation Configuration

The shell app is configured as a Module Federation host. Key files:

- `apps/shell/webpack.config.js`: Contains Module Federation plugin configuration
- Currently references `mfe1` remote (not yet created)
- Shared dependencies configured for `@example-nx-project/shared/ui` and `@example-nx-project/shared/data-access`

To add a new micro-frontend:

```bash
npx nx g @nx/angular:app <app-name> --mfe --mfeType=remote --host=shell
```

## Project Structure Patterns

- **Apps**: Individual applications live in `apps/` directory
- **Libraries**: Shared code should go in `libs/` (create with `npx nx g @nx/angular:lib`)
- **Testing**: Each app has unit tests alongside code, E2E tests in `apps/<app>-e2e/`
- **Configuration**: App-specific config in `apps/<app>/project.json`

## Technology Stack

- Angular 20.x with Standalone Components
- Nx 21.4.0 for monorepo management
- TypeScript 5.8.x with strict mode
- Jest for unit testing
- Playwright for E2E testing
- SCSS for styling
- Angular SSR (Server-Side Rendering) enabled

## Development Notes

- ESLint is configured with Nx module boundary enforcement rules
- Prettier uses single quotes for consistency
- Nx caching is enabled for build, test, and lint operations
- The workspace uses SWC for faster TypeScript compilation
- Angular build system handles optimization and bundling
