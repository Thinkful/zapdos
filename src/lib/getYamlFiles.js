const globby = require('globby');

const getYamlFile = require('./getYamlFile');

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
