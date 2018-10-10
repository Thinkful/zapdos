const path = require('path');
const util = require('util');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { buildModules } = require('../../tasks');

class BuildModulesCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir },
    } = this.parse(BuildModulesCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const moduleDirectory = path.resolve(cwd, modulesDir);

    this.log(`>> Building modules\n`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(moduleDirectory)}\n`);

    try {
      const mods = await buildModules(moduleDirectory, libraryDirectory);

      // Just log for now
      this.log();
      this.log(util.inspect(mods, false, null, true));

      this.log(c.green('\n✅ All done!'));
    } catch (error) {
      this.log(c.red('\n❌ Failed'));
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
