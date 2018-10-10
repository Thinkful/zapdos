const _ = require('lodash');
const fs = require('fs-extra');
const yaml = require('js-yaml');

module.exports = async files => {
  for (const file of files) {
    // Remove the path so it's not added the file
    const dumpableFile = _.omit(file, ['path', 'src']);

    await fs.writeFile(file.path, yaml.safeDump(dumpableFile));
  }
};
