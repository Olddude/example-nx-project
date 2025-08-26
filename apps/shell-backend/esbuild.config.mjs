import { build } from 'esbuild';

await build({
  entryPoints: ['apps/shell-backend/src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/apps/shell/index.js',
  packages: 'bundle',
  minify: false,
  sourcemap: false,
  target: 'node18',
  external: [],
});