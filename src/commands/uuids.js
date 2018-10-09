const fs = require('fs');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');
const glob = require('glob');

const {
  createFileUuids,
  getLibraryFiles,
  getYamlFiles,
  setLibraryFiles,
  setYamlFiles,
} = require('../lib');

class UuidsCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, programsDir, strict },
    } = this.parse(UuidsCommand);

    const coloredMode = strict ? c.red('strict') : c.green('normal');
    const cwd = process.cwd();
    const libraryDirectory = `${cwd}/${libraryDir}`;
    const modulesDirectory = `${cwd}/${modulesDir}`;
    const programsDirectory = `${cwd}/${programsDir}`;

    this.log(`>> Running in ${coloredMode} mode`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(modulesDirectory)}`);
    this.log(`🏔 Programs: ${c.blue(programsDirectory)}`);

    try {
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

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.error(error);
    }
  }
}

UuidsCommand.description = `Generate uuids for checkpoints, modules, and programs.
This function looks at all the \`content.md\` files in the library directory and
all \`.yaml\` files in the module and program directories and adds a new uuid
to any file without one.
`;

UuidsCommand.flags = {
  strict: flags.boolean({ char: 's', description: 'Run in strict mode' }),
  libraryDir: flags.string({
    char: 'l',
    default: 'library',
    description: 'Directory containing library',
  }),
  modulesDir: flags.string({
    char: 'm',
    default: 'modules',
    description: 'Directory containing module files',
  }),
  programsDir: flags.string({
    char: 'p',
    default: 'programs',
    description: 'Directory containing program files',
  }),
};

module.exports = UuidsCommand;
