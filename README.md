# dist-analyzer

Dead simple [Astro.js](https://astro.build/) plugin to analyze how bloated bundle is. By default it calculates count and size of all files inside `outDir` folder.

Output example:

```
| type | amount |  size |   size\* |
| :--- | -----: | ----: | -------: |
| HTML |      5 | 17753 | 17.75 kB |
| CSS  |      8 |  7110 |  7.11 kB |
| SVG  |      1 |   749 |    749 B |
| ICO  |      1 |   655 |    655 B |
| ...  |     15 | 26267 | 26.27 kB |
```

# Installation

While this plugin not uploaded to NPM you can install it directly from this repo

```sh
npm i github:Alex-1701/dist-analyzer
```

# Usage

Add plugin to `astro.config.*` file

```js
// @ts-check
import { defineConfig } from "astro/config";
import distAnalyzer from "dist-analyzer";

export default defineConfig({
  integrations: [distAnalyzer()],
});
```

Now run build and check console

```sh
astro build
```

# Settings

| param    | default | description                                               |
| -------- | ------- | --------------------------------------------------------- |
| native   | `false` | show result via `console.table`                           |
| markdown | `true`  | show result as markdown table                             |
| summary  | `true`  | show summary size of folder                               |
| exclude  | `[]`    | list of file types that will be ignored. Case insensetive |

Just for example:

```js
// @ts-check
import { defineConfig } from "astro/config";
import distAnalyzer from "dist-analyzer";

export default defineConfig({
  integrations: [
    distAnalyzer({
      native: true,
      markdown: false,
      summary: false,
      exclude: ["DS_Store"],
    }),
  ],
});
```

# Next steps

Having troubles with bundle size? Try out this plugins:

- [vite-plugin-clean-build](https://github.com/oyjt/vite-plugin-clean-build) - remove unused files from bundle.
- [astro-purgecss](https://github.com/codiume/orbit/tree/main/packages/astro-purgecss) - remove unused CSS
- [astro-id-minifier](https://github.com/Alex-1701/astro-id-minifier) - minify custom Astro data attributes
- [astro-compressor](https://github.com/sondr3/astro-compressor) - compress files via gzip, brotli and zstd

# CLI

`npx github:Alex-1701/dist-analyzer`
