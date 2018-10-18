const c = require('ansi-colors');
const frontMatter = require('front-matter');
const fs = require('fs-extra');

const normalizeCheckpoint = require('./normalizeCheckpoint');

const SRC_REGEX = /\/([a-z0-9\.\_\+\-]+)\/content\.md$/i;

const getSrc = filePath => filePath.match(SRC_REGEX)[1];

module.exports = async filePath => {
  try {
    // Read the file markdown
    const fileRaw = await fs.readFile(filePath, 'utf8');

    // Add required dashes to front of file if missing
    const fileCleaned = /^---\n/.test(fileRaw) ? fileRaw : `---\n${fileRaw}`;

    // Ensure the src can be matched so content can be referenced from module
    const src = getSrc(filePath);

    if (!src) {
      throw new Error(`Could not parse src with regex ${SRC_REGEX}`);
    }

    // Normalize structure and attributes
    const checkpoint = await normalizeCheckpoint(frontMatter(fileCleaned));

    // Create a lightweight object with path and data
    return {
      ...checkpoint,
      path: filePath,
      src,
    };
  } catch (error) {
    const errorMsg = `${
      error.code === 'ENOENT' ? 'No file at path' : 'Could not parse file at '
    } ${c.red(filePath)}:\n${error}`;
    throw new Error(errorMsg);
  }
};
