const c = require('ansi-colors');
const frontMatter = require('front-matter');
const fs = require('fs-extra');

module.exports = async filePath => {
  try {
    // Read the file markdown
    const fileRaw = await fs.readFile(filePath, 'utf8');

    // Add required dashes to front of file if missing
    const fileCleaned = /^---\n/.test(fileRaw) ? fileRaw : `---\n${fileRaw}`;

    // Create a lightweight object with path and data
    return {
      ...frontMatter(fileCleaned),
      path: filePath,
      src: filePath.match(/\/([a-z0-9\.\_\+\-]+)\/content\.md$/i)[1],
    };
  } catch (error) {
    new Error(`Could not parse file at ${c.red(filePath)}:\n${error}`);
  }
};
