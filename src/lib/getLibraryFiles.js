const globby = require('globby');

const getLibraryFile = require('./getLibraryFile');

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
