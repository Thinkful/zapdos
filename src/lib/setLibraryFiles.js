const fs = require('fs-extra');
const yaml = require('js-yaml');

const setLibraryFile = async file => {
  // Recreate the markdown file
  const fileData = `---
${yaml.safeDump(file.attributes)}---

${file.body}`;

  await fs.writeFile(file.path, fileData);
};

module.exports = async files => {
  for (const file of files) {
    await setLibraryFile(file);
  }
};
