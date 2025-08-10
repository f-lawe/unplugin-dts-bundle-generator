import type { RollupOptions } from './common';
import { createRollupPlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createRollupPlugin<RollupOptions>(unpluginFactory);
