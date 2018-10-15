const { getCurriculumFromModule, uploadCurriculumToS3 } = require('../lib');

const buildModule = require('./buildModule');
const createUuids = require('./createUuids');

module.exports = async (modulePath, libraryDirectory) => {
  // Check the library for all uuids
  createUuids(libraryDirectory, null, null, { strict: true });

  // build the module
  const mod = await buildModule(modulePath, libraryDirectory);
  log(`Built module "${mod.src}"`);

  const curriculum = getCurriculumFromModule(mod);
  log(`Built curriculum for module "${mod.src}"`);

  await uploadCurriculumToS3(curriculum);
  log(`Published curriculum for module "${mod.src}"`);

  return mod;
};
