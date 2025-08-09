# DTS Bundle Generator Unplugin

[![Versions](https://img.shields.io/npm/v/unplugin-dts-bundle-generator)](https://www.npmjs.com/package/unplugin-dts-bundle-generator?activeTab=versions)
[![Downloads](https://img.shields.io/npm/dt/unplugin-dts-bundle-generator)](https://www.npmjs.com/package/unplugin-dts-bundle-generator)
[![Licence](https://img.shields.io/npm/l/unplugin-dts-bundle-generator)](./LICENCE)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/f-lawe/unplugin-dts-bundle-generator/pr-checks.yml)](https://github.com/f-lawe/unplugin-dts-bundle-generator/actions/workflows/pr-checks.yml)

Ever wanted to easily package your typescript library with a bundled declaration file? Integrate [DTS Bundle Generator](https://github.com/timocov/dts-bundle-generator) within [Vite](https://github.com/vitejs/vite) or any other blundler supported by [Unplugin](https://github.com/unjs/unplugin)!
(see available bundlers below)

## Installation
```sh
npm i --save-dev unplugin-dts-bundle-generator
```

```sh
yarn add --dev unplugin-dts-bundle-generator
```

## Usage
Currently, only Vite and Rollup are fully supported, more bundlers to come. Please open a PR or an issue if you need another export and want to speed up the process, so we can work it out!

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

<details>
<summary>Rollup</summary><br>

With Rollup, add this block to your `rollup.config.ts`:

```ts
import dtsBundleGenerator from 'unplugin-dts-bundle-generator/rollup';

export default {
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

## Configuration

This library handle both single and multiple entrypoints. You can use any of the output, libraries and compilation options available in the [config file](https://github.com/timocov/dts-bundle-generator/blob/master/src/config-file/README.md) of DTS Bundle Generator.
