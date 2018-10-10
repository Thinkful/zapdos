const _ = require('lodash');

module.exports = async (module, libraryFiles) => {
  const chekpoints = [];

  for (const src of module.checkpoints) {
    // Look for the child
    const child = _.find(libraryFiles, { src });

    // Error if child not found
    if (!child) {
      throw new Error(`No content found with src "${src}"`);
    }

    chekpoints.push(child);
  }

  return chekpoints;
};
