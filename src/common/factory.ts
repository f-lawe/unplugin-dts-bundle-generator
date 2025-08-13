import type { EntryPointConfig } from 'dts-bundle-generator';
import type { UnpluginFactory } from 'unplugin';
import type { Options, OptionsForESBuild, OptionsForRollup, OptionsForVite } from '.';

import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { generateDtsBundle } from 'dts-bundle-generator';
import colors from 'picocolors';

interface BundleConfig {
  outFile?: string;
  outDir?: string;
}

interface Bundle {
  entryPointConfig: EntryPointConfig;
  outFile: string;
  size: number;
  compressedSize: number;
}

interface Item {
  in: string;
  out: string;
}

export const unpluginFactory: UnpluginFactory<Options, false> = (options) => {
  const bundleConfig: BundleConfig = {};
  const bundles: Array<Bundle> = [];
  const items: Array<Item> = [];

  return {
    name: 'unplugin-dts-bundle-generator',
    buildEnd() {
      items.forEach((item) => bundles.push({
        entryPointConfig: {
          filePath: item.in,
          libraries: options.libraries,
          output: options.output,
        },
        outFile: item.out,
        size: -1,
        compressedSize: -1,
      }));
    },
    writeBundle() {
      bundles.forEach((bundle, index) => {
        if (bundle.size === -1) {
          const content = generateDtsBundle([bundle.entryPointConfig], options.compilation)[0];
          fs.writeFileSync(bundle.outFile, content);
          bundles[index].size = Buffer.byteLength(content);
          bundles[index].compressedSize = zlib.gzipSync(content).length;
        }
      });
    },
    esbuild: {
      config(buildOptions) {
        if (!buildOptions.entryPoints) {
          return;
        }

        const esbuildOptions = options as OptionsForESBuild;
        const entryPoints = typeof buildOptions.entryPoints === 'string'
          ? [buildOptions.entryPoints]
          : !Array.isArray(buildOptions.entryPoints)
              ? Object.values(buildOptions.entryPoints)
              : buildOptions.entryPoints;

        if (entryPoints.length === 1 && (esbuildOptions.outfile || buildOptions.outfile)) {
          items[0] = {
            in: typeof entryPoints[0] === 'string' ? entryPoints[0] : entryPoints[0].in,
            out: esbuildOptions.outfile || buildOptions.outfile!,
          };
        }
        else {
          entryPoints.map((entryPoint) => typeof entryPoint !== 'string'
            ? entryPoint
            : {
                in: entryPoint,
                out: path.basename(entryPoint).split('.')[0],
              },
          ).forEach((entryPoint) => {
            items.push({
              in: entryPoint.in,
              out: `${buildOptions.outdir}/${entryPoint.out}.d.ts`,
            });
          });
        }
      },
    },
    rollup: {
      buildStart(inputOptions) {
        if (Array.isArray(inputOptions.input)) {
          if (inputOptions.input.length === 1) {
            inputOptions.input.forEach((input, index) => items.push({
              in: input,
              out: bundleConfig.outFile ?? `${index}`,
            }));
          }
          else {
            inputOptions.input.forEach((input, index) => items.push({
              in: input,
              out: bundleConfig.outDir
                ? `${bundleConfig.outDir}/${path.basename(input).split('.')[0]}.d.ts`
                : `${index}`,
            }));
          }
        }
        else {
          Object.entries(inputOptions.input).forEach(([entryName, input]) => items.push({
            in: input,
            out: bundleConfig.outDir
              ? `${bundleConfig.outDir}/${path.basename(input).split('.')[0]}.d.ts`
              : entryName,
          }));
        }
      },
      outputOptions(outputOptions) {
        // Rolldown triggers this hook BEFORE buildStart, so we check that and store output options for later use
        if (bundles.length === 0) {
          bundleConfig.outFile = outputOptions.file;
          bundleConfig.outDir = outputOptions.dir;
          console.log(bundleConfig);
          return;
        }

        const rollupOptions = options as OptionsForRollup;

        if (bundles.length === 1 && (rollupOptions.file || outputOptions.file)) {
          bundles[0].outFile = rollupOptions.file ?? outputOptions.file!.replace(/\.js$/, '.d.ts');
        }
        else {
          bundles.forEach((bundle, index) => {
            const basename = `${path.basename(bundle.entryPointConfig.filePath).split('.')[0]}.d.ts`;
            bundles[index].outFile = `${outputOptions.dir}/${basename}`;
          });
        }
      },
    },
    vite: {
      configResolved(config) {
        const viteOption = options as OptionsForVite;

        if (config.build.lib) {
          const fileName = (entryName: string = 'default'): string => {
            if (typeof viteOption.fileName == 'string') {
              return `${config.build.outDir}/${viteOption.fileName}`;
            }
            return `${config.build.outDir}/${viteOption.fileName(entryName)}`;
          };

          if (typeof config.build.lib.entry == 'string') {
            items.push({
              in: config.build.lib.entry,
              out: fileName(),
            });
          }
          else if (Array.isArray(config.build.lib.entry)) {
            config.build.lib.entry.forEach((entry, index) => items.push({
              in: entry,
              out: fileName(`${index}`),
            }));
          }
          else {
            Object.entries(config.build.lib.entry).forEach(([entryName, entry]) => items.push({
              in: entry,
              out: fileName(entryName),
            }));
          }
        }

        bundleConfig.outDir = config.build.outDir;
      },
      closeBundle() {
        const length = bundles.length.toString();
        this.environment.logger.info(`\n${colors.green('✓')} ${length} declaration bundles generated.`);

        const outFileLength = Math.max(...bundles.map((bundle) => bundle.outFile.length));
        const options = {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        };

        bundles.forEach((bundle) => this.environment.logger.info(
          colors.dim(`${bundleConfig.outDir}`)
          + colors.cyan(bundle.outFile.replace(bundleConfig.outDir ?? '', ''))
          + ' '.repeat(outFileLength - bundle.outFile.length + 2)
          + colors.gray(`${(bundle.size / 1000).toLocaleString('en', options)} kB`)
          + colors.dim(` │ gzip: ${(bundle.compressedSize / 1000).toLocaleString('en', options)} kB`),
        ));
      },
    },
  };
};
