import type { ESBuildOptions } from './common';
import { createEsbuildPlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createEsbuildPlugin<ESBuildOptions>(unpluginFactory);
