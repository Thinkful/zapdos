const c = require('ansi-colors');
const log = require('fancy-log');

const uploadToS3 = require('./uploadToS3');

const getKey = curriculum =>
  `curricula/${curriculum.uuid}/${curriculum.id}/curriculum.json`;

module.exports = async curriculum => {
  // Get the params for S3
  const key = getKey(curriculum);
  const data = JSON.stringify(curriculum);
  const contentType = 'application/json';

  // Attempt to upload
  try {
    await uploadToS3(key, data, contentType);
    log(`Published curriculum ${c.green(key)} to S3`);
  } catch (error) {
    log.error(`Failed to publish ${c.red(key)} to S3: ${error}`);
    throw error;
  }
};
