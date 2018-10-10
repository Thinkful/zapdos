const c = require('ansi-colors');
const fs = require('fs-extra');
const yaml = require('js-yaml');

const SRC_REGEX = /\/([a-z0-9\.\_\+\-]+)\.yaml$/i;

const getSrc = filePath => filePath.match(SRC_REGEX)[1];

module.exports = async filePath => {
  try {
    // Read the file markdown
    const fileRaw = await fs.readFile(filePath, 'utf8');

    // Add path and src to the data
    return {
      ...yaml.load(fileRaw),
      path: filePath,
      src: getSrc(filePath),
    };
  } catch (error) {
    const errorMsg = `${
      error.code === 'ENOENT' ? 'No file at path' : 'Could not parse file at '
    } ${c.red(filePath)}:\n${error}`;
    throw new Error(errorMsg);
  }
};
