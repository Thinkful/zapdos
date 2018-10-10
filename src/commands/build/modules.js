const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const {
  expandModuleCheckpoints,
  getLibraryFiles,
  getYamlFiles,
} = require('../../lib');

class BuildModulesCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir },
    } = this.parse(BuildModulesCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const moduleDirectory = path.resolve(cwd, modulesDir);

    this.log(`>> Building modules`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(moduleDirectory)}`);

    try {
      // Get the module
      const modules = await getYamlFiles(moduleDirectory);

      this.log(
        `>> Found ${modules.length} module${modules.length === 1 ? '' : 's'}:`
      );
      for (const module of modules) {
        this.log(`>>   ${module.src}`);
      }

      // Get the library objects
      const libraryFiles = await getLibraryFiles(libraryDirectory);

      for (const module of modules) {
        // Attach the children to the object
        module.checkpoints = await expandModuleCheckpoints(
          module,
          libraryFiles
        );
      }

      // Just log for now
      this.log(modules);

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.log(c.red('❌ Failed'));
      this.error(error);
    }
  }
}

BuildModulesCommand.description = `Build all modules
Loads a all module \`.yaml\` files and add checkpoint objects from the library
to them.
`;

BuildModulesCommand.flags = {
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
};

module.exports = BuildModulesCommand;
