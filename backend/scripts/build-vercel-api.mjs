import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

// Bundle workspace packages whose published "exports" point at raw .ts source
// (e.g. @muzammil328/education-packages) since the Node runtime can't load .ts
// files directly. Real npm dependencies stay external.
const external = Object.keys(pkg.dependencies ?? {}).filter(
  name => name !== '@muzammil328/education-packages'
);

await esbuild.build({
  entryPoints: ['api/_handler.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  external,
  outfile: 'api/index.js',
  tsconfig: 'tsconfig.json',
  logLevel: 'info',
});
