const c = require('ansi-colors');
const uuidv4 = require('uuid/v4');

const processFile = (file, options) => {
  const attributeName = options && options.attributeName;
  const strict = options && options.strict;

  const existingUuid = attributeName ? file[attributeName].uuid : file.uuid;

  // Error out if running in strict mode and no uuid
  if (strict && !existingUuid) {
    throw new Error(`${c.red(file.path)} has no uuid. Exiting strict mode`);
  }

  if (attributeName && !file[attributeName]) {
    console.warn(
      c.yellow(
        `No attribute "${attributeName}" found for ${c.yellow(
          file.path
        )}. Creating`
      )
    );
    file[attributeName] = {};
  }

  // Add missing uuid to nested attribute if specified, otherwise root
  if (!existingUuid) {
    console.log(`Creating uuid for ${c.green(file.path)}`);
    if (attributeName) {
      file[attributeName].uuid = uuidv4();
    } else {
      file.uuid = uuidv4();
    }
  }
};

module.exports = async (files, options) => {
  // Process the file objects
  for (const file of files) {
    processFile(file, options);
  }

  return files;
};
