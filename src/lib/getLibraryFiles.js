const c = require('ansi-colors');
const frontMatter = require('front-matter');
const fs = require('fs-extra');
const globby = require('globby');

const getLibraryFile = async filePath => {
  try {
    const fileRaw = await fs.readFile(filePath, 'utf8');

    return {
      path: filePath,
      data: frontMatter(fileRaw),
    };
  } catch (error) {
    new Error(`Could not parse file at ${c.red(filePath)}`);
  }
};

module.exports = async targetDirectory => {
  // Create the pattern for finding all content files
  const globPattern = `${targetDirectory}/**/content.md`;

  // Get all file paths matching the pattern
  const filePaths = await globby(globPattern, null);

  const fileObjects = [];

  // Create lightweight file objects with path and data
  for (const filePath of filePaths) {
    const fileObject = await getLibraryFile(filePath);
    fileObjects.push(fileObject);
  }

  return fileObjects;
};
