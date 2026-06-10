import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['api/_handler.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  packages: 'external',
  outfile: 'api/index.js',
  tsconfig: 'tsconfig.json',
  logLevel: 'info',
});
