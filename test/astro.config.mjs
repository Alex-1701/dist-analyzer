// @ts-check
import { defineConfig } from "astro/config";
import distAnalyzer from "dist-analyzer";

export default defineConfig({
  integrations: [distAnalyzer()],
  build: {
    inlineStylesheets: "never",
  },
});
