const fs = require('fs');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');
const glob = require('glob');

const { createUuids, getLibraryFiles, setLibraryFiles } = require('../lib');

class UuidsCommand extends Command {
  async run() {
    const { flags } = this.parse(UuidsCommand);

    const directory = flags.directory;
    const strict = flags.strict;

    const coloredMode = strict ? c.red('strict') : c.green('normal');
    const cwd = process.cwd();
    const targetDirectory = `${cwd}/${directory}`;

    this.log(`>> Running in ${coloredMode} mode`);
    this.log(`📍 cwd: ${c.blue(cwd)}`);
    this.log(`🎯 Target: ${c.blue(targetDirectory)}`);

    try {
      const libraryFiles = await getLibraryFiles(targetDirectory);
      const updatedLibraryFiles = await createUuids(libraryFiles, { strict });
      await setLibraryFiles(updatedLibraryFiles);
      this.log(c.green('✅ All done!'));
    } catch (error) {
      this.error(error);
    }
  }
}

UuidsCommand.description = `Generate uuids for library
Each directory in \`library\` should have a \`content.md\` file with metadata
at the top. This function looks at all the content and adds a new uuid to the
metadata if it's not already present.
`;

UuidsCommand.flags = {
  strict: flags.boolean({ char: 's', description: 'Run in strict mode' }),
  directory: flags.string({
    char: 'd',
    default: 'library',
    description: 'Directory of library',
  }),
};

module.exports = UuidsCommand;
