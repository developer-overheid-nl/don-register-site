// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: {
    allowedHosts: [
      'api-register.don.apps.digilab.network'
    ]
  },
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@astrojs/react']
    }
  }
});