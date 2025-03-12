import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';
import { robotsConfig } from './robots.config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mauromotion.com',

  markdown: {
    shikiConfig: {
      theme: 'poimandres',
    },
  },

  integrations: [robotsTxt(robotsConfig)],
});

