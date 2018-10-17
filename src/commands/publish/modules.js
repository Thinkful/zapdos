const path = require('path');
const util = require('util');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { getCurriculumFromModule } = require('../../lib');
const { publishModules } = require('../../tasks');

class PublishModulesCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir },
    } = this.parse(PublishModulesCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const moduleDirectory = path.resolve(cwd, modulesDir);

    this.log(`>> Publishing all modules\n`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(moduleDirectory)}\n`);

    try {
      const mods = await publishModules(moduleDirectory, libraryDirectory);

      // Just log for now
      this.log();
      this.log(util.inspect(mods, false, null, true));

      this.log('\nCurricula:\n');

      for (const mod of mods) {
        // this.log(util.inspect(getCurriculumFromModule(mod), false, null, true));
      }

      this.log(c.green('\n✅ All done!'));
    } catch (error) {
      this.log(c.red('\n❌ Failed'));
      this.error(error);
    }
  }
}

PublishModulesCommand.description = `Publish all modules
Builds all modules in module directory, transforms them to curricula, and
uploads them to S3, if correct credentials are present.
`;

PublishModulesCommand.flags = {
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

module.exports = PublishModulesCommand;
