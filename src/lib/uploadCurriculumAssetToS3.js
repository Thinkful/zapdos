const c = require('ansi-colors');
const log = require('fancy-log');
const fs = require('fs-extra');

const uploadToS3 = require('./uploadToS3');

const getFileName = assetPath => {
  const parts = assetPath.split('/');
  return parts[parts.length - 1];
};

const getKey = (curriculum, assetPath) =>
  `curricula/${curriculum.uuid}/${curriculum.code}/v${
    curriculum.version
  }/assets2/${getFileName(assetPath)}`;

module.exports = async (curriculum, assetPath) => {
  // Get the params for S3
  const key = getKey(curriculum, assetPath);
  const data = await fs.readFile(assetPath);

  // Attempt to upload
  try {
    await uploadToS3(key, data);
    log(`Uploaded asset ${c.green(key)} to S3`);
  } catch (error) {
    log.error(`Failed to upload asset ${c.red(key)} to S3: ${error}`);
    throw error;
  }
};
