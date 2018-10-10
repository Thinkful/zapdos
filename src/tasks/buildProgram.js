const { expandProgramModules, getYamlFile } = require('../lib');

const buildModules = require('./buildModules');

module.exports = async (programPath, moduleDirectory, libraryDirectory) => {
  // Get the module
  const program = await getYamlFile(programPath);

  // Get the library objects
  const moduleFiles = await buildModules(moduleDirectory, libraryDirectory);

  // Attach the children to the object
  program.modules = await expandProgramModules(program, moduleFiles);

  return program;
};
