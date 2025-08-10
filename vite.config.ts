import { defineConfig, normalizePath } from 'vite';

import p from './package.json' with { type: 'json' };
import dtsBundleGenerator from './src/vite';

const entry = Object.fromEntries(Object.keys(p.exports).map((exportKey) => exportKey === '.'
  ? ['dts-bundle-generator', normalizePath('./src/index.ts')]
  : [exportKey.replace('./', ''), normalizePath(`./src/${exportKey.replace('./', '')}.ts`)],
));

export default defineConfig({
  plugins: [
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
  build: {
    sourcemap: false,
    lib: {
      entry,
      formats: ['cjs', 'es'],
      fileName: (format: string, entryName: string) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      output: {
        chunkFileNames: '[name].[format].js',
      },
      external: ['dts-bundle-generator', 'node:buffer', 'node:fs', 'node:path', 'node:zlib', 'picocolors', 'unplugin'],
    },
  },
});
