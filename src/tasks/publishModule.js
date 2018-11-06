const log = require('fancy-log');

const { getCurriculumFromModule, publishCurriculum } = require('../lib');

const buildModule = require('./buildModule');

module.exports = async (modulePath, libraryDirectory) => {
  // build the module
  const mod = await buildModule(modulePath, libraryDirectory);
  log(`Built module "${mod.src}"`);

  const curriculum = getCurriculumFromModule(mod);
  log(`Built curriculum for module "${mod.src}"`);

  await publishCurriculum(curriculum, libraryDirectory);
  log(`Published curriculum for module "${mod.src}"`);

  return mod;
};
