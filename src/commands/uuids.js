const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { createUuids } = require('../tasks');

class UuidsCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, programsDir, strict },
    } = this.parse(UuidsCommand);

    const coloredAction = strict ? c.red('Checking') : c.green('Creating');
    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulesDirectory = path.resolve(cwd, modulesDir);
    const programsDirectory = path.resolve(cwd, programsDir);
    const options = { strict };

    this.log(`>> ${coloredAction} uuids`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(modulesDirectory)}`);
    this.log(`🏔 Programs: ${c.blue(programsDirectory)}`);

    try {
      await createUuids(
        libraryDirectory,
        modulesDirectory,
        programsDirectory,
        options
      );

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.log(c.red('❌ Failed'));
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
