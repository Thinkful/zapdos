const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFile,
} = require('../../lib');

class BuildModuleCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name },
    } = this.parse(BuildModuleCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulePath = path.resolve(cwd, modulesDir, `${name}.yaml`);

    this.log(`>> Building module "${name}"`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Module: ${c.blue(modulePath)}`);

    try {
      // Get the module
      const mod = await getYamlFile(modulePath);

      // Get the library objects
      const libraryFiles = await getLibraryFiles(libraryDirectory);

      // Attach the children to the object
      mod.checkpoints = await expandModuleCheckpoints(mod, libraryFiles);

      // Just log for now
      this.log(mod);

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.log(c.red('❌ Failed'));
      this.error(error);
    }
  }
}

BuildModuleCommand.description = `Build a module 
Loads a module's \`.yaml\` file and adds checkpoint objects from the library.
`;

BuildModuleCommand.flags = {
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

module.exports = BuildModuleCommand;
