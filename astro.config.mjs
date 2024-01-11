import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { SITE } from './src/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  devToolbar: {
    'enabled': false,
  },
  integrations: [tailwind(), icon()]
});