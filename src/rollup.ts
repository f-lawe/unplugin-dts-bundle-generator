import type { OptionsForRollup } from './common';
import { createRollupPlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createRollupPlugin<OptionsForRollup>(unpluginFactory);
