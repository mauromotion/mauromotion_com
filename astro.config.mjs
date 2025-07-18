import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';
import { robotsConfig } from './robots.config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://mauromotion.com',

  markdown: {
    shikiConfig: {
      theme: 'poimandres',
    },
  },

  integrations: [robotsTxt(robotsConfig), react()],
});