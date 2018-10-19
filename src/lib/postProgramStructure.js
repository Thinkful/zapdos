const axios = require('axios');
const log = require('fancy-log');

const {
  PROGRAM_STRUCTURES_AUTH_TOKEN,
  PROGRAM_STRUCTURES_URL,
} = require('../config');

module.exports = async program => {
  try {
    if (!PROGRAM_STRUCTURES_URL) {
      throw new Error(
        'PROGRAM_STRUCTURES_URL missing for this environment. Check enviroment'
      );
    }

    log(
      `Posting program with code ${program.code} (${
        program.uuid
      }) to ${PROGRAM_STRUCTURES_URL}`
    );

    response = await axios.post(PROGRAM_STRUCTURES_URL, program, {
      params: { token: PROGRAM_STRUCTURES_AUTH_TOKEN },
    });

    log(
      `Successfully posted program with code ${
        program.code
      } to ${PROGRAM_STRUCTURES_URL}: ${response.data}`
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      `Error posting program with code ` +
      `${program.code} (${program.uuid}): ${error}`;
    log.error(errorMessage);
    throw error;
  }
};