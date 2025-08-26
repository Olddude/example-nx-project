import { build } from 'esbuild';

await build({
  entryPoints: ['apps/microfrontend-one-backend/src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/apps/microfrontend-one/index.js',
  packages: 'bundle',
  minify: false,
  sourcemap: false,
  target: 'node18',
  external: [],
});