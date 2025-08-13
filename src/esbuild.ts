import type { OptionsForESBuild } from './common';
import { createEsbuildPlugin } from 'unplugin';
import { unpluginFactory } from './common';

export default createEsbuildPlugin<OptionsForESBuild>(unpluginFactory);
