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

    response = await axios.post(PROGRAM_STRUCTURES_URL, program, {
      params: { token: PROGRAM_STRUCTURES_AUTH_TOKEN },
    });

    log(
      `Successfully posted program with code ${program.code}: ${response.data}`
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
