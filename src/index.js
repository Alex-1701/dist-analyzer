import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { filesize } from "filesize";
import { tablemark } from "tablemark";

const getTypes = (files) => {
  const result = files.reduce((acc, cur) => {
    const parts = cur.split(".");
    if (parts.length === 1) {
      return acc;
    }

    const extension = parts.at(-1);

    if (acc.includes(extension)) {
      return acc;
    } else {
      return [...acc, extension];
    }
  }, []);

  return result;
};

const mapFilesByType = (files, types) => {
  const result = types.map((type) => {
    const regex = new RegExp(`.${type}$`);
    const filesForType = files.filter((file) => file.match(regex));

    return { type, amount: filesForType.length, files: filesForType };
  });

  return result;
};

const mapFilesWithSizes = (files, pathToDist) => {
  const result = files.map(async (res) => {
    const promises = res.files.map((file) => {
      return fs.readFile(`${pathToDist}/${file}`);
    });

    const allReadedFiles = await Promise.all(promises);
    const sizeSum = allReadedFiles.reduce((acc, cur) => acc + cur.length, 0);

    return { ...res, size: sizeSum };
  });

  return result;
};

export const main = async ({ native, markdown, summary, exclude, outDir }) => {
  const files = await fs.readdir(outDir, { recursive: true });
  const types = getTypes(files);
  const upperCaseExclude = exclude.map((str) => str.toUpperCase());
  const filteredTypes = types.filter(
    (type) => !upperCaseExclude.includes(type.toUpperCase()),
  );
  const filesByType = mapFilesByType(files, filteredTypes);
  const resultWithSize = mapFilesWithSizes(filesByType, outDir);
  const calculatedResultWithSize = await Promise.all(resultWithSize);

  const formatted = calculatedResultWithSize
    .map(({ type, amount, size }) => ({
      type: type.toUpperCase(),
      amount,
      size,
      "size*": filesize(size),
    }))
    .sort((a, b) => b.size - a.size);

  if (summary) {
    const summarySize = calculatedResultWithSize.reduce(
      (sum, cur) => sum + cur.size,
      0,
    );

    const summaryAmount = calculatedResultWithSize.reduce(
      (sum, cur) => sum + cur.amount,
      0,
    );

    formatted.push({
      type: "...",
      amount: summaryAmount,
      size: summarySize,
      "size*": filesize(summarySize),
    });
  }

  if (native) {
    console.table(formatted);
  }

  if (markdown) {
    console.log(
      tablemark(formatted, {
        columns: [
          { name: "type", align: "left" },
          { name: "amount", align: "right" },
          { name: "size", align: "right" },
          { name: "size\\*", align: "right" },
        ],
      }),
    );
  }
};

export default function distAnalyzer(config) {
  const defaultConfig = {
    native: false,
    markdown: true,
    summary: true,
    exclude: [],
  };

  return {
    name: "dist-analyzer",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const path = fileURLToPath(dir);
        await main({ ...defaultConfig, ...config, outDir: path });
      },
    },
  };
}

export async function distAnalyzerCli(config) {
  const defaultConfig = {
    native: false,
    markdown: true,
    summary: true,
    exclude: [],
  };

  await main({ ...defaultConfig, ...config });
}
