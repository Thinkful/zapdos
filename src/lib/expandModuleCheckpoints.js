const _ = require('lodash');

module.exports = async (module, libraryFiles) => {
  const chekpoints = [];

  const libraryFilesBySrc = _.keyBy(libraryFiles, 'src');

  for (const src of module.checkpoints) {
    // Get the content object from the map
    const child = libraryFilesBySrc[src];

    // Error if child not found
    if (!child) {
      const errorMsg =
        `Checkpoint "${src}" for Module "${module.src}" not found. ` +
        `Does the \`${src}\` directory exist in the library ` +
        `and have a \`content.md\`?`;
      throw new Error(errorMsg);
    }

    chekpoints.push(child);
  }

  return chekpoints;
};
