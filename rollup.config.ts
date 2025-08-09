import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';

// @ts-expect-error JS Build
// eslint-disable-next-line antfu/no-import-dist
import dtsBundleGenerator from './dist/rollup.es.js';

import p from './package.json' with { type: 'json' };

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
  external: ['picocolors'],
  plugins: [
    typescript(),
    nodeExternals({
      include: ['picocolors'],
    }),
    dtsBundleGenerator({
      fileName: (entryName: string) => `${entryName}.d.ts`,
      output: {
        noBanner: true,
      },
      compilation: {
        preferredConfigPath: './tsconfig.json',
      },
    }),
  ],
};
