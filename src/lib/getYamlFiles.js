const c = require('ansi-colors');
const fs = require('fs-extra');
const globby = require('globby');
const yaml = require('js-yaml');

const getYamlFile = async filePath => {
  try {
    // Read the file markdown
    const fileRaw = await fs.readFile(filePath, 'utf8');

    return {
      ...yaml.load(fileRaw),
      path: filePath,
    };
  } catch (error) {
    new Error(`Could not parse file at ${c.red(filePath)}:\n${error}`);
  }
};

module.exports = async targetDirectory => {
  // Create the pattern for finding all content files
  const globPattern = `${targetDirectory}/*.yaml`;

  // Get all file paths matching the pattern
  const filePaths = await globby(globPattern);

  const fileObjects = [];

  for (const filePath of filePaths) {
    fileObjects.push(await getYamlFile(filePath));
  }

  return fileObjects;
};
