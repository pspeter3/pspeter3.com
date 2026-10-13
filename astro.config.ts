import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://pspeter3.com",
  output: "static",
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
  markdown: {
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: { theme: "nord" },
  },
});
