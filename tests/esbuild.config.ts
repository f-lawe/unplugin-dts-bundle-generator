import * as esbuild from 'esbuild';

// @ts-expect-error JS Build
// eslint-disable-next-line antfu/no-import-dist
import dtsBundleGenerator from '../dist/esbuild.es.js';

await esbuild.build({
  entryPoints: ['src/index.ts', 'src/vite.ts', 'src/rollup.ts', 'src/esbuild.ts'],
  // outfile: './dist-esbuild/index.js',
  outdir: './dist-esbuild',
  format: 'esm',
  bundle: true,
  packages: 'external',
  platform: 'node',
  plugins: [dtsBundleGenerator({
    // outfile: './dist-esbuild/index.d.ts',
    output: {
      noBanner: true,
    },
    compilation: {
      preferredConfigPath: './tsconfig.json',
    },
  })],
});
