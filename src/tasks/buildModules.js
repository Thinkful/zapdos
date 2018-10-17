const log = require('fancy-log');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFiles,
} = require('../lib');

module.exports = async (moduleDirectory, libraryDirectory) => {
  // Get the module
  const mods = await getYamlFiles(moduleDirectory);

  log(`Found ${mods.length} module${mods.length === 1 ? '' : 's'}:`);
  for (const mod of mods) {
    log(`  - ${mod.src} (${mod.code})`);
  }

  // Get the library objects
  const libraryFiles = await getLibraryFiles(libraryDirectory);

  for (const mod of mods) {
    // Attach the children to the object
    mod.checkpoints = await expandModuleCheckpoints(mod, libraryFiles);
  }

  return mods;
};
