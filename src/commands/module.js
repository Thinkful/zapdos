const path = require('path');

const { Command, flags } = require('@oclif/command');
const c = require('ansi-colors');

const { getLibraryFiles, getModuleChildren, getYamlFile } = require('../lib');

class ModuleCommand extends Command {
  async run() {
    const {
      flags: { libraryDir, modulesDir, name },
    } = this.parse(ModuleCommand);

    const libraryPath = path.resolve(process.cwd(), libraryDir);
    const modulePath = path.resolve(process.cwd(), modulesDir, `${name}.yaml`);

    // Get the module
    const module = await getYamlFile(modulePath);

    // Get the library objects
    const libraryFiles = await getLibraryFiles(libraryPath);

    // Attach the children to the object
    module.children = await getModuleChildren(module, libraryFiles);

    this.log(module);
  }
}

ModuleCommand.description = `Generate a module 
This function looks at all the \`content.md\` files in the library directory and
all \`.yaml\` files in the module and program directories and adds a new uuid
to any file without one.
`;

ModuleCommand.flags = {
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

module.exports = ModuleCommand;
