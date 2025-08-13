import type { CompilationOptions, EntryPointConfig } from 'dts-bundle-generator';

interface DtsBundleGeneratorOptions {
  output?: EntryPointConfig['output'];
  libraries?: EntryPointConfig['libraries'];
  compilation?: CompilationOptions;
}

export interface OptionsForESBuild extends DtsBundleGeneratorOptions {
  outfile?: string;
}

export interface OptionsForRolldown extends DtsBundleGeneratorOptions {
  file?: string;
}

export interface OptionsForRollup extends DtsBundleGeneratorOptions {
  file?: string;
}

export interface OptionsForVite extends DtsBundleGeneratorOptions {
  fileName: string | ((entryName: string) => string);
}

export type Options = OptionsForESBuild | OptionsForRollup | OptionsForVite;
