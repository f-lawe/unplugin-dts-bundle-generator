import type { OptionsForVite } from './common';
import { createVitePlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createVitePlugin<OptionsForVite>(unpluginFactory);
