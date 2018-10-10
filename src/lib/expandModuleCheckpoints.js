const _ = require('lodash');

module.exports = async (module, libraryFiles) => {
  const chekpoints = [];

  for (const src of module.checkpoints) {
    // Look for the child
    const child = _.find(libraryFiles, { src });

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
