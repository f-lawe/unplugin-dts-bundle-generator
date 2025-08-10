import type { ViteOptions } from './common';
import { createVitePlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createVitePlugin<ViteOptions>(unpluginFactory);
