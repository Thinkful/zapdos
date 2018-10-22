const c = require('ansi-colors');
const log = require('fancy-log');

const { getCurriculumFromModule, publishCurriculum } = require('../lib');

const buildModules = require('./buildModules');

module.exports = async (moduleDirectory, libraryDirectory) => {
  // Get the module
  const mods = await buildModules(moduleDirectory, libraryDirectory);
  log(`Built ${mods.length} module${mods.length === 1 ? '' : 's'}\n`);

  for (const mod of mods) {
    const curriculum = getCurriculumFromModule(mod);
    log(`Built curriculum for module "${mod.src}"`);

    await publishCurriculum(curriculum, libraryDirectory);
    log(c.green(`Published curriculum for module "${mod.src}"\n`));
  }

  return mods;
};
