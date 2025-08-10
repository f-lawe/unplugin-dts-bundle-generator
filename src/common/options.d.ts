import type { CompilationOptions, EntryPointConfig } from 'dts-bundle-generator';

interface DtsBundleGeneratorOptions {
  output?: EntryPointConfig['output'];
  libraries?: EntryPointConfig['libraries'];
  compilation?: CompilationOptions;
}

export interface ESBuildOptions extends DtsBundleGeneratorOptions {
  outfile?: string;
}

export interface RollupOptions extends DtsBundleGeneratorOptions {
  file?: string;
}

export interface ViteOptions extends DtsBundleGeneratorOptions {
  fileName: string | ((entryName: string) => string);
}

export type Options = ESBuildOptions | RollupOptions | ViteOptions;
