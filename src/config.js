const DEPLOY_SERVER =
  process.env.CIRCLE_BRANCH === 'master' ? 'PROD' : 'PREVIEW';

// Pull from different env vars based on branch
module.exports = {
  S3_ACCESS_KEY: process.env[`S3_${DEPLOY_SERVER}_ACCESS_KEY`],
  S3_BUCKET: process.env[`S3_${DEPLOY_SERVER}_BUCKET`],
  S3_SECRET_KEY: process.env[`S3_${DEPLOY_SERVER}_SECRET_KEY`],
};
