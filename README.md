# dist-analyzer

Simple [Astro.js](https://astro.build/) plugin to analyze how bloated build is. By default it calculates count and size of all files inside `.dist` folder.

Output example:

```
| type | amount | size |  size\* |
| :--- | -----: | ---: | ------: |
| HTML |      1 | 5675 | 5.68 kB |
| SVG  |      3 | 5117 | 5.12 kB |
| ICO  |      1 |  655 |   655 B |

SUM: 11447 (11.45 kB)
```

# Installation

While this plugin not uploaded to NPM you can install it directly from this repo

```sh
npm i github:Alex-1701/dist-analyzer
```

# Usage

Add plugin to `astro.config.mjs` config

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
