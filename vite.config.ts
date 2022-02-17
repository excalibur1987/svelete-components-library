import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";
import path from "path";
import fs from "fs";
import "dotenv/config";

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json").toString());

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [svelte()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});

// Load path aliases from the tsconfig.json file
const aliases = tsconfig.compilerOptions.paths;

for (const alias in aliases) {
  const paths = aliases[alias].map((p) => path.resolve(p));

  // Our tsconfig uses glob path formats, whereas webpack just wants directories
  // We'll need to transform the glob format into a format acceptable to webpack

  const wpAlias = alias.replace(/(\\|\/)\*$/, "");
  const wpPaths = paths.map((p) => p.replace(/(\\|\/)\*$/, ""));

  if (!config.resolve) config.resolve = {};
  if (!config.resolve.alias) config.resolve.alias = {};

  if (
    config.resolve &&
    config.resolve.alias &&
    !(wpAlias in config.resolve.alias)
  ) {
    config.resolve.alias[wpAlias] = wpPaths.length > 1 ? wpPaths : wpPaths[0];
  }
}

export default config;
