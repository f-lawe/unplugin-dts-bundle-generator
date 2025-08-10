import typescript from '@rollup/plugin-typescript';

// @ts-expect-error JS Build
// eslint-disable-next-line antfu/no-import-dist
import dtsBundleGenerator from '../dist/rollup.es.js';

import p from '../package.json' with { type: 'json' };

export default {
  input: Object.keys(p.exports).map((exportKey) => exportKey === '.'
    ? 'src/index.ts'
    : `src/${exportKey.replace('./', '')}.ts`),
  output: {
    dir: 'dist-rollup',
    format: 'es',
    sourcemap: false,
    chunkFileNames: '[name].[format].js',
  },
  external: ['dts-bundle-generator', 'node:buffer', 'node:fs', 'node:path', 'node:zlib', 'picocolors', 'unplugin'],
  plugins: [
    typescript(),
    dtsBundleGenerator({
      output: {
        noBanner: true,
      },
      compilation: {
        preferredConfigPath: './tsconfig.json',
      },
    }),
  ],
};
