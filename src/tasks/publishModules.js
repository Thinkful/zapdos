const c = require('ansi-colors');
const log = require('fancy-log');

const { getCurriculumFromModule, uploadCurriculumToS3 } = require('../lib');

const buildModules = require('./buildModules');

module.exports = async (moduleDirectory, libraryDirectory) => {
  // Get the module
  const mods = await buildModules(moduleDirectory, libraryDirectory);
  log(`Built ${mods.length} module${mods.length === 1 ? '' : 's'}\n`);

  for (const mod of mods) {
    const curriculum = getCurriculumFromModule(mod);
    log(`Built curriculum for module "${mod.src}"`);

    await uploadCurriculumToS3(curriculum);
    log(c.green(`Published curriculum for module "${mod.src}"\n`));
  }

  return mods;
};
