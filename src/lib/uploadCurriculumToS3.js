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

module.exports = mod => {
  // Create S3 service
  const s3 = new AWS.S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    Bucket: S3_BUCKET,
  });

  const params = getParams(mod);

  s3.putObject(params, err => {
    if (err) console.log(err, err.stack);
    else console.log(`Published module ${mod.src} to S3 as ${params.Key}`);
  });
};
