#!/usr/bin/env node

import { cwd } from "node:process";
import { distAnalyzerCli } from "./index.js";

let dir = cwd();

if (process.argv[2] && !/--/.test(process.argv[2])) {
  dir = dir.concat("/", process.argv[2]);
}

const config = {
  outDir: dir,
};

for (const arg of process.argv) {
  if (arg === `--markdown`) {
    config.markdown = true;
  }

  if (arg === `--native`) {
    config.native = true;
  }

  if (arg === `--summary`) {
    config.summary = true;
  }
}

distAnalyzerCli(config);
