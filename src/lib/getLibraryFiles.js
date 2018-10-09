const c = require('ansi-colors');
const frontMatter = require('front-matter');
const fs = require('fs-extra');
const globby = require('globby');

const getLibraryFile = async filePath => {
  try {
    // Read the file markdown
    const fileRaw = await fs.readFile(filePath, 'utf8');

    // Add required dashes to front of file if missing
    const fileCleaned = /^---\n/.test(fileRaw) ? fileRaw : `---\n${fileRaw}`;

    // Create a lightweight object with path and data
    return {
      ...frontMatter(fileCleaned),
      path: filePath,
    };
  } catch (error) {
    new Error(`Could not parse file at ${c.red(filePath)}:\n${error}`);
  }
};

module.exports = async targetDirectory => {
  // Create the pattern for finding all content files
  const globPattern = `${targetDirectory}/**/content.md`;

  // Get all file paths matching the pattern
  const filePaths = await globby(globPattern);

  const fileObjects = [];

  for (const filePath of filePaths) {
    fileObjects.push(await getLibraryFile(filePath));
  }

  return fileObjects;
};
