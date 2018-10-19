const log = require('fancy-log');

const {
  expandProgramModules,
  getYamlFiles,
  validateProgram,
} = require('../lib');

const buildModules = require('./buildModules');

module.exports = async (
  programDirectory,
  moduleDirectory,
  libraryDirectory
) => {
  // Get the module
  const programs = await getYamlFiles(programDirectory);

  log(`Found ${programs.length} program${programs.length === 1 ? '' : 's'}:`);
  for (const program of programs) {
    log(`  - ${program.src}`);
  }
  log();

  for (const program of programs) {
    await validateProgram(program);
  }

  // Get the library objects
  const moduleFiles = await buildModules(moduleDirectory, libraryDirectory);

  // Attach the children
  for (const program of programs) {
    program.modules = await expandProgramModules(program, moduleFiles);
  }

  return programs;
};
