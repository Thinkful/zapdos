const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { buildProgram } = require('../../tasks');

class BuildProgramCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name, programsDir },
    } = this.parse(BuildProgramCommand);

    const cwd = process.cwd();
    const libraryDirectory = path.resolve(cwd, libraryDir);
    const modulesDirectory = path.resolve(cwd, modulesDir);
    const programPath = path.resolve(cwd, programsDir, `${name}.yaml`);

    this.log(`>> Building program "${name}"`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`📚 Library: ${c.blue(libraryDirectory)}`);
    this.log(`📦 Modules: ${c.blue(modulesDirectory)}`);
    this.log(`📦 Modules: ${c.blue(programPath)}`);

    try {
      const program = await buildProgram(
        programPath,
        modulesDirectory,
        libraryDirectory
      );

      // Just log for now
      this.log(program);

      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.log(c.red('❌ Failed'));
      this.error(error);
    }
  }
}

BuildProgramCommand.description = `Build a program
Loads a program's \`.yaml\` file and adds modules objects from the modules
directory and checkpoint objects from the library.
`;

BuildProgramCommand.flags = {
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
    description:
      'Name of program to build (eg [name] in /programs/[name].yaml)',
    required: true,
  }),
  programsDir: flags.string({
    char: 'p',
    default: 'programs',
    description: 'Directory containing program files',
  }),
};

module.exports = BuildProgramCommand;
