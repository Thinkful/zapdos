const _ = require('lodash');

module.exports = async (program, moduleFiles) => {
  const mods = [];

  const modsBySrc = _.keyBy(moduleFiles, 'src');

  for (const src of program.modules) {
    // Get the module object from the map
    const child = modsBySrc[src];

    // Error if child not found
    if (!child) {
      const errorMsg =
        `Module "${src}" for Program "${program.src}" not found. ` +
        `Does the \`${src}.yaml\` file exist in the module directory?`;
      throw new Error(errorMsg);
    }

    mods.push(child);
  }

  return mods;
};
