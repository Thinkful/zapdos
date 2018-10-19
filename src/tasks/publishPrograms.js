const { postProgramStructure } = require('../lib');

const buildPrograms = require('./buildPrograms');
const publishModules = require('./publishModules');

module.exports = async (
  programDirectory,
  moduleDirectory,
  libraryDirectory
) => {
  // Get all programs to publish.
  // We do this before publishing modules to check for build errors
  const programs = await buildPrograms(
    programDirectory,
    moduleDirectory,
    libraryDirectory
  );

  // Publish all modules
  await publishModules(moduleDirectory, libraryDirectory);

  // Post all the program structures
  for (program of programs) {
    await postProgramStructure(program);
  }

  return programs;
};
