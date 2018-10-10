const _ = require('lodash');

module.exports = async (module, libraryFiles) => {
  console.log(module, libraryFiles);
  const children = [];

  for (const src of module.checkpoints) {
    // Look for the child
    const child = _.find(libraryFiles, { src });

    // Error if child not found
    if (!child) {
      throw new Error(`No content found with src "${src}"`);
    }

    children.push(child);
  }

  return children;
};
