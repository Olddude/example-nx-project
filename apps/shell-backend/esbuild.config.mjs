import { build } from 'esbuild';

const isDevelopment = process.env.NODE_ENV === 'development';

await build({
  entryPoints: ['apps/shell-backend/src/main.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/apps/shell-backend/index.js',
  packages: 'bundle',
  minify: !isDevelopment,
  sourcemap: isDevelopment,
  target: 'node18',
  external: [],
});