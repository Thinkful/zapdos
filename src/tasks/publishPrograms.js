const { postProgramStructure } = require('../lib');

const buildPrograms = require('./buildPrograms');
const publishModules = require('./publishModules');

module.exports = async (
  programDirectory,
  moduleDirectory,
  libraryDirectory
) => {
  // Publish all modules
  await publishModules(moduleDirectory, libraryDirectory);

  // Get all programs to publish
  const programs = await buildPrograms(
    programDirectory,
    moduleDirectory,
    libraryDirectory
  );

  // Post all the program structures
  for (program of programs) {
    await postProgramStructure(program);
  }

  return programs;
};
