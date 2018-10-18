const log = require('fancy-log');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFiles,
  validateModule,
} = require('../lib');

module.exports = async (moduleDirectory, libraryDirectory) => {
  // Get the module
  const mods = await getYamlFiles(moduleDirectory);

  log(`Found ${mods.length} module${mods.length === 1 ? '' : 's'}:`);
  for (const mod of mods) {
    log(`  - ${mod.src} (${mod.code})`);
  }

  // Validate the modules
  for (const mod of mods) {
    await validateModule(mod);
  }

  // Get the library objects
  const libraryFiles = await getLibraryFiles(libraryDirectory);

  // Expand each module's checkpoints
  for (const mod of mods) {
    mod.checkpoints = await expandModuleCheckpoints(mod, libraryFiles);
  }

  return mods;
};
