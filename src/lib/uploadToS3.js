const { S3 } = require('aws-sdk');

const { S3_ACCESS_KEY, S3_BUCKET, S3_SECRET_KEY } = require('../config');

// Create S3 service
const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  Bucket: S3_BUCKET,
});

const getParams = (key, data, contentType = null, acl = 'public-read') => {
  const params = {
    Bucket: S3_BUCKET,
    Key: key,
    Body: data,
    ACL: acl,
  };

  // Only add the content type if it's specified
  if (contentType) {
    params.ContentType = contentType;
  }

  return params;
};

module.exports = (key, data, contentType = null, acl = 'public-read') => {
  return new Promise((resolve, reject) => {
    s3.putObject(getParams(key, data, contentType, acl), err => {
      if (err) reject(err);
      else resolve(key);
    });
  });
};
