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
  const { strict } = options || {};

  // Add uuids to library files
  let updatedLibraryFiles;
  if (libraryDirectory) {
    const libraryFiles = await getLibraryFiles(libraryDirectory);
    updatedLibraryFiles = await createFileUuids(libraryFiles, {
      attributeName: 'attributes',
      strict,
    });
  }

  // Add uuids to module files
  let updatedModuleFiles;
  if (modulesDirectory) {
    const moduleFiles = await getYamlFiles(modulesDirectory);
    updatedModuleFiles = await createFileUuids(moduleFiles, {
      strict,
    });
  }

  // Add uuids to program files
  let updatedProgramFiles;
  if (programsDirectory) {
    const programFiles = await getYamlFiles(programsDirectory);
    updatedProgramFiles = await createFileUuids(programFiles, {
      strict,
    });
  }

  if (!strict) {
    // Replace all files. Do this after to ensure strict mode is observed
    if (updatedLibraryFiles) await setLibraryFiles(updatedLibraryFiles);
    if (updatedModuleFiles) await setYamlFiles(updatedModuleFiles);
    if (updatedProgramFiles) await setYamlFiles(updatedProgramFiles);
  }
};
