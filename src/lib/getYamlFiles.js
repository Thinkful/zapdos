const getYamlFile = require('./getYamlFile');
const getYamlFilePaths = require('./getYamlFilePaths');

module.exports = async targetDirectory => {
  const filePaths = await getYamlFilePaths(targetDirectory);

  const fileObjects = [];

  for (const filePath of filePaths) {
    fileObjects.push(await getYamlFile(filePath));
  }

  return fileObjects;
};
