const path = require('path');
const util = require('util');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { publishPrograms } = require('../../tasks');

class PublishProgramsCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, programsDir },
    } = this.parse(PublishProgramsCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulesDirectory = path.resolve(cwd, modulesDir);
    const programsDirectory = path.resolve(cwd, programsDir);

    this.log(`>> Publishing all programs\n`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(modulesDirectory)}`);
    this.log(`🏔 Programs: ${c.blue(programsDirectory)}\n`);

    try {
      const programs = await publishPrograms(
        programsDirectory,
        modulesDirectory,
        libraryDirectory
      );

      // Just log for now
      this.log();
      this.log(util.inspect(programs, false, null, true));

      this.log(c.green('\n✅ All done!'));
    } catch (error) {
      this.log(c.red('\n❌ Failed'));
      this.error(error);
    }
  }
}

PublishProgramsCommand.description = `Publish all programs
Publishes all modules to S3, then posts the structure of each program to
the server
`;

PublishProgramsCommand.flags = {
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

module.exports = PublishProgramsCommand;
