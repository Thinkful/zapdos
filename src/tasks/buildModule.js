const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFile,
} = require('../lib');

module.exports = async (modulePath, libraryDirectory) => {
  // Get the module
  const mod = await getYamlFile(modulePath);

  // Get the library objects
  const libraryFiles = await getLibraryFiles(libraryDirectory);

  // Attach the children to the object
  mod.checkpoints = await expandModuleCheckpoints(mod, libraryFiles);

  return mod;
};
