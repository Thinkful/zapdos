const _ = require('lodash');
const axios = require('axios');
const log = require('fancy-log');

const {
  UPDATE_CURRICULUM_VERSION_AUTH_TOKEN,
  UPDATE_CURRICULUM_VERSION_URL,
} = require('../config');

module.exports = async curriculum => {
  const curriculumRepr = `"${curriculum.name}" (${curriculum.code})`;

  try {
    if (!UPDATE_CURRICULUM_VERSION_URL) {
      throw new Error(
        'UPDATE_CURRICULUM_VERSION_URL missing for this environment'
      );
    }

    log(`Updating version on curriculum ${curriculumRepr}`);

    // Send identifying attributes to update version
    const response = axios.post(
      UPDATE_CURRICULUM_VERSION_URL,
      _.pick(curriculum, ['code', 'name', 'uuid']),
      {
        params: { token: UPDATE_CURRICULUM_VERSION_AUTH_TOKEN },
      }
    );

    log(
      `Successfully updated curriculum version for ${curriculumRepr}: ${
        response.data
      }`
    );

    return response.data;
  } catch (error) {
    log.error(
      `Error updating version on curriculum ${curriculumRepr}: ${error}`
    );
    throw error;
  }
};
