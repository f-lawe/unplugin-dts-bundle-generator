import type { EntryPointConfig } from 'dts-bundle-generator';

export interface Bundle {
  entryPointConfig: EntryPointConfig;
  outFile: string;
  size: number;
  compressedSize: number;
}

export interface BundleConfig {
  outFile?: string;
  outDir?: string;
}

export interface Item {
  in: string;
  out: string;
}
