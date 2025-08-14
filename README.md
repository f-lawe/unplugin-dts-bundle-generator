# DTS Bundle Generator Unplugin

[![Versions](https://img.shields.io/npm/v/unplugin-dts-bundle-generator)](https://www.npmjs.com/package/unplugin-dts-bundle-generator?activeTab=versions)
[![Downloads](https://img.shields.io/npm/dt/unplugin-dts-bundle-generator)](https://www.npmjs.com/package/unplugin-dts-bundle-generator)
[![Licence](https://img.shields.io/npm/l/unplugin-dts-bundle-generator)](./LICENCE)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/f-lawe/unplugin-dts-bundle-generator/pr-checks.yml)](https://github.com/f-lawe/unplugin-dts-bundle-generator/actions/workflows/pr-checks.yml)

Ever wanted to easily package your typescript library with a bundled declaration file? Integrate [DTS Bundle Generator](https://github.com/timocov/dts-bundle-generator) within your favourite bundler thanks to [Unplugin](https://github.com/unjs/unplugin)!

_(see available bundlers below)_

## Installation
```sh
npm i --save-dev unplugin-dts-bundle-generator
```

```sh
yarn add --dev unplugin-dts-bundle-generator
```

## Usage
Only those bundlers are supported at the moment:

<details>
<summary>ESBuild</summary><br>

With ESBuild, add this block when calling `esbuild.build()`:

```ts
import * as esbuild from 'esbuild';
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/rollup';

await esbuild.build({
  plugins: [
    dtsBundleGenerator({
      outfile: 'my-lib.d.ts',
      output: {
        // output config
      },
      libraries: {
        // libraries config
      },
      compilation: {
        // compilation options
      }
    }),
  ],
  entryPoints: 'src/index.ts',
  outfile: 'my-lib.js',
  format: 'esm',
  bundle: true,
});
```
<br></details>

<details>
<summary>Rolldown</summary><br>

With Rolldown, add this block to your `rolldown.config.ts`:

```ts
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/rolldown';

export default {
  plugins: [
    dtsBundleGenerator({
      file: 'my-lib.d.ts',
      output: {
        // output config
      },
      libraries: {
        // libraries config
      },
      compilation: {
        // compilation options
      }
    }),
  ],
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
};
```
<br></details>

<details>
<summary>Rollup</summary><br>

With Rollup, add this block to your `rollup.config.ts`:

```ts
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/rollup';

export default {
  plugins: [
    dtsBundleGenerator({
      file: 'my-lib.d.ts',
      output: {
        // output config
      },
      libraries: {
        // libraries config
      },
      compilation: {
        // compilation options
      }
    }),
  ],
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
};
```
<br></details>

<details>
<summary>Vite</summary><br>

With Vite, add this block to your `vite.config.ts`:

```ts
import path from 'node:path';
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/vite';
import { defineConfig, normalizePath } from 'vite';

export default defineConfig({
  plugins: [
    dtsBundleGenerator({
      fileName: 'my-lib.d.ts',
      output: {
        // output config
      },
      libraries: {
        // libraries config
      },
      compilation: {
        // compilation options
      }
    })
  ],
  build: {
    lib: {
      entry: normalizePath('src/index.ts'),
      formats: ['es'],
      fileName: 'my-lib.js'
    }
  }
});
```
<br></details>

⚠️ Be careful! Plugin options may vary depending on the bundler you are using.

Feel free to open a PR or an issue if you need another export and want to speed up the process, so we can work it out.

## Configuration

This library handle both single and multiple entrypoints. You can use any of the output, libraries and compilation options available in the [config file](https://github.com/timocov/dts-bundle-generator/blob/master/src/config-file/README.md) of DTS Bundle Generator.
