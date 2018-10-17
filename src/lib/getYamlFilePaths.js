const globby = require('globby');

module.exports = async targetDirectory => {
  // Create the pattern for finding all content files
  const globPattern = `${targetDirectory}/*.yaml`;

  // Find the files
  return await globby(globPattern);
};
