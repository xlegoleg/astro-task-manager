import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: "server",
  server: {
    port: 4321,
    host: '0.0.0.0',
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [svelte(), tailwind()],
});