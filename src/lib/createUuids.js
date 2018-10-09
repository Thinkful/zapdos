const c = require('ansi-colors');
const uuidv4 = require('uuid/v4');

const processFile = async (file, options) => {
  const { data, path } = file;
  // Error out if running in strict mode and no uuid
  if (options && options.strict && !data.uuid) {
    throw new Error(`${c.red(path)} has no uuid. Exiting strict mode`);
  }

  // Add missing uuid
  if (!data.uuid) {
    data.uuid = uuidv4();
  }
};

module.exports = async (files, options) => {
  // Process the file objects
  for (const file of files) {
    await processFile(file, options);
  }

  return files;
};
