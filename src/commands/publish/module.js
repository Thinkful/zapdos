const path = require('path');
const util = require('util');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { getCurriculumFromModule } = require('../../lib');
const { publishModule } = require('../../tasks');

class PublishModuleCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name },
    } = this.parse(PublishModuleCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulePath = path.resolve(cwd, modulesDir, `${name}.yaml`);

    this.log(`>> Building module "${name}"\n`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Module: ${c.blue(modulePath)}\n`);

    try {
      const mod = await publishModule(modulePath, libraryDirectory);

      // Just log for now
      this.log();
      this.log(util.inspect(mod, false, null, true));

      this.log('\nCurriculum:\n');
      this.log(util.inspect(getCurriculumFromModule(mod), false, null, true));

      this.log(c.green('\n✅ All done!'));
    } catch (error) {
      this.log(c.red('\n❌ Failed'));
      this.error(error);
    }
  }
}

PublishModuleCommand.description = `Build a module 
Loads a module's \`.yaml\` file and adds checkpoint objects from the library.
`;

PublishModuleCommand.flags = {
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

module.exports = PublishModuleCommand;
