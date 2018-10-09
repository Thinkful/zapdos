const c = require('ansi-colors');
const uuidv4 = require('uuid/v4');

const processFile = (file, options) => {
  const { attributes, path } = file;

  // Error out if running in strict mode and no uuid
  if (options && options.strict && !data.uuid) {
    throw new Error(`${c.red(path)} has no uuid. Exiting strict mode`);
  }

  // Add missing uuid
  if (!attributes.uuid) {
    attributes.uuid = uuidv4();
  }
};

module.exports = async (files, options) => {
  // Process the file objects
  for (const file of files) {
    processFile(file, options);
  }

  return files;
};
