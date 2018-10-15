const c = require('ansi-colors');
const { S3 } = require('aws-sdk');
const log = require('fancy-log');
const fs = require('fs-extra');

const { S3_ACCESS_KEY, S3_BUCKET, S3_SECRET_KEY } = require('../config');

const getFileName = assetPath => {
  const parts = assetPath.split('/');
  return parts[parts.length - 1];
};

const getKey = (curriculum, assetPath) =>
  `curricula/${curriculum.uuid}/${curriculum.code}/v${
    curriculum.version
  }/assets2/${getFileName(assetPath)}`;

const getParams = (curriculum, assetPath, assetData) => ({
  Bucket: S3_BUCKET,
  Key: getKey(curriculum, assetPath),
  Body: JSON.stringify(assetData),
  ACL: 'public-read',
});

module.exports = async (curriculum, assetPath) => {
  const s3 = new S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    Bucket: S3_BUCKET,
  });

  return new Promise(async (resolve, reject) => {
    try {
      const assetData = await fs.readFile(assetPath);

      const params = getParams(curriculum, assetPath, assetData);

      log(`Uploading ${assetPath} to ${params.Key}...`);

      s3.putObject(params, error => {
        if (error) {
          log.error(`Problem uploading to s3 ${c.red(assetPath)}: ${error}`);
          reject(error);
        } else {
          log(`Uploaded ${c.green(assetPath)} to ${c.green(params).Key}`);
          resolve(assetPath);
        }
      });
    } catch (error) {
      log.error(`Problem uploading to S3 ${c.red(assetPath)}: ${error}`);
      reject(error);
    }
  });
};
