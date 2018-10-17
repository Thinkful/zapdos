const _ = require('lodash');

const validateCheckpoint = require('./validateCheckpoint');

module.exports = async (module, libraryFiles) => {
  const chekpoints = [];

  const libraryFilesBySrc = _.keyBy(libraryFiles, 'src');

  for (const src of module.checkpoints) {
    // Get the content object from the map
    const checkpoint = libraryFilesBySrc[src];

    // Error if checkpoint not found
    if (!checkpoint) {
      const errorMsg =
        `Checkpoint "${src}" for Module "${module.src}" not found. ` +
        `Does the \`${src}\` directory exist in the library ` +
        `and have a \`content.md\`?`;
      throw new Error(errorMsg);
    }

    // Ensure the checkpoint is valid
    await validateCheckpoint(checkpoint);

    chekpoints.push(checkpoint);
  }

  return chekpoints;
};
