const c = require('ansi-colors');
const axios = require('axios');
const log = require('fancy-log');

const {
  CONTENT_BUNDLE_RELEASES_AUTH_TOKEN,
  CONTENT_BUNDLES_URL,
  S3_BUCKET,
} = require('../config');

const getUrl = curriculum => `${CONTENT_BUNDLES_URL}/${curriculum.id}/releases`;

const getBasePath = curriculum =>
  `https://${S3_BUCKET}.s3.amazonaws.com/curricula/${curriculum.uuid}/${
    curriculum.id
  }`;

module.exports = async curriculum => {
  try {
    if (!CONTENT_BUNDLES_URL) {
      log.warn(c.yellow('CONTENT_BUNDLES_URL missing. Cannot post release'));
      return;
    }

    const url = getUrl(curriculum);
    const data = {
      base_path: getBasePath(curriculum),
      title: curriculum.name,
      version: curriculum.version,
    };

    log(`Posting content bundle "${curriculum.id}" to ${url}`);

    response = await axios.post(url, data, {
      params: { token: CONTENT_BUNDLE_RELEASES_AUTH_TOKEN },
    });

    log(
      c.green(`Successfully posted content bundle "${curriculum.id}" to ${url}`)
    );

    return response.data;
  } catch (error) {
    log.error(
      `Error posting content bundle "${curriculum.id}": ${c.red(error)}`
    );
    throw error;
  }
};
