const {
  createFileUuids,
  getLibraryFiles,
  getYamlFiles,
  setLibraryFiles,
  setYamlFiles,
} = require('../lib');

module.exports = async (
  libraryDirectory,
  modulesDirectory,
  programsDirectory,
  options
) => {
  const { strict } = options;

  // Add uuids to library files
  const libraryFiles = await getLibraryFiles(libraryDirectory);
  const updatedLibraryFiles = await createFileUuids(libraryFiles, {
    attributeName: 'attributes',
    strict,
  });

  // Add uuids to module files
  const moduleFiles = await getYamlFiles(modulesDirectory);
  const updatedModuleFiles = await createFileUuids(moduleFiles, {
    strict,
  });

  // Add uuids to program files
  const programFiles = await getYamlFiles(programsDirectory);
  const updatedProgramFiles = await createFileUuids(programFiles, {
    strict,
  });

  // Replace all files. Do this after to ensure strict mode is observed
  await setLibraryFiles(updatedLibraryFiles);
  await setYamlFiles(updatedModuleFiles);
  await setYamlFiles(updatedProgramFiles);
};
