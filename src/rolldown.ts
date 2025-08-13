import type { OptionsForRolldown } from './common';
import { createRolldownPlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createRolldownPlugin<OptionsForRolldown>(unpluginFactory);
