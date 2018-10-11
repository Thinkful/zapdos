const c = require('ansi-colors');
const AWS = require('aws-sdk');

const { S3_ACCESS_KEY, S3_BUCKET, S3_SECRET_KEY } = require('../config');

const getKey = mod =>
  `curricula/${mod.uuid}/${mod.code}/v${mod.version}/curriculum.json`;

const getParams = mod => ({
  Bucket: S3_BUCKET,
  Key: getKey(mod),
  Body: JSON.stringify(mod),
  ACL: 'public-read',
  ContentType: 'application/json',
});

module.exports = curriculum => {
  // Create S3 service
  const s3 = new AWS.S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    Bucket: S3_BUCKET,
  });

  const params = getParams(curriculum);

  return new Promise((resolve, reject) => {
    s3.putObject(params, err => {
      if (err) reject(err);
      else {
        console.log(`Published curriculum ${c.green(params.Key)} to S3`);
        resolve(mod);
      }
    });
  });
};
