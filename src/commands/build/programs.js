const path = require('path');
const util = require('util');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { buildPrograms } = require('../../tasks');

class BuildProgramsCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name, programsDir },
    } = this.parse(BuildProgramsCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulesDirectory = path.resolve(cwd, modulesDir);
    const programsDirectory = path.resolve(cwd, programsDir);

    this.log(`>> Building programs\n`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(modulesDirectory)}`);
    this.log(`🏔  Programs: ${c.blue(programsDirectory)}\n`);

    try {
      const programs = await buildPrograms(
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

BuildProgramsCommand.description = `Build all programs
Loads each program \`.yaml\` file and adds modules objects from the modules
directory and checkpoint objects from the library to them.
`;

BuildProgramsCommand.flags = {
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

module.exports = BuildProgramsCommand;
