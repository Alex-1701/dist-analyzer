import fs from "node:fs/promises";

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

const PATH_TO_DIST_FOLDER = "./dist";
const files = await fs.readdir(PATH_TO_DIST_FOLDER, { recursive: true });
const types = getTypes(files);
const filesByType = mapFilesByType(files, types);
const resultWithSize = mapFilesWithSizes(filesByType, PATH_TO_DIST_FOLDER);
const calculatedResultWithSize = await Promise.all(resultWithSize);

const formatted = calculatedResultWithSize
  .map(({ type, amount, size }) => ({
    type,
    amount,
    size,
  }))
  .sort((a, b) => b.size - a.size);

console.table(formatted);
