const { getCurriculumFromModule, uploadCurriculumToS3 } = require('../lib');

const buildModule = require('./buildModule');

module.exports = async (modulePath, libraryDirectory) => {
  // build the module
  const mod = await buildModule(modulePath, libraryDirectory);

  const curriculum = getCurriculumFromModule(mod);

  uploadCurriculumToS3(curriculum);

  return mod;
};
