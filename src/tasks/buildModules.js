const log = require('fancy-log');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFiles,
} = require('../lib');

const createUuids = require('./createUuids');

module.exports = async (moduleDirectory, libraryDirectory) => {
  // Check the library and modules for uuids
  createUuids(libraryDirectory, moduleDirectory, null, { strict: true });

  // Get the module
  const mods = await getYamlFiles(moduleDirectory);

  log(`Found ${mods.length} module${mods.length === 1 ? '' : 's'}:`);
  for (const mod of mods) {
    log(`  - ${mod.src}`);
  }

  // Get the library objects
  const libraryFiles = await getLibraryFiles(libraryDirectory);

  for (const mod of mods) {
    // Attach the children to the object
    mod.checkpoints = await expandModuleCheckpoints(mod, libraryFiles);
  }

  return mods;
};
