const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFile,
} = require('../../lib');

class ModuleCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name },
    } = this.parse(ModuleCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulePath = path.resolve(cwd, modulesDir, `${name}.yaml`);

    this.log(`>> Building module "${name}"`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Module: ${c.blue(modulePath)}`);

    try {
      // Get the module
      const module = await getYamlFile(modulePath);

      // Get the library objects
      const libraryFiles = await getLibraryFiles(libraryDirectory);

      // Attach the children to the object
      module.checkpoints = await expandModuleCheckpoints(module, libraryFiles);

      // Just log for now
      this.log(module);

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.log(c.red('❌ Failed'));
      this.error(error);
    }
  }
}

ModuleCommand.description = `Build a module 
Loads a module's \`.yaml\` file and adds checkpoint objects from the library.
`;

ModuleCommand.flags = {
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
  name: flags.string({
    char: 'n',
    description: 'Name of module to build (eg [name] in /modules/[name].yaml)',
    required: true,
  }),
};

module.exports = ModuleCommand;
