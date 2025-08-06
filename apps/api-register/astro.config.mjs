// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://apis.developer.overheid.nl',
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@astrojs/react'],
      // external: ['@developer-overheid-nl/don-register-components/fetch'],
    },
    optimizeDeps: {
      include: ['@developer-overheid-nl/don-register-components/fetch'],
    },
  },
  env: {
    schema: {
      API_URL: envField.string({ context: 'client', access: 'public'}),
      API_ENDPOINT: envField.string({ context: 'client', access: 'public'}),
      API_X_API_KEY: envField.string({ context: 'server', access: 'public' }),
      API_VERSION: envField.string({ context: 'client', access: 'public', default: 'v1' }),
    },
    validateSecrets: false,
  },
});
