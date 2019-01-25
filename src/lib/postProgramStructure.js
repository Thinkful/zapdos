const axios = require('axios');
const log = require('fancy-log');

const {
  PROGRAM_STRUCTURES_AUTH_TOKEN,
  PROGRAM_STRUCTURES_URL,
} = require('../config');

module.exports = async program => {
  try {
    if (!PROGRAM_STRUCTURES_URL) {
      log.error(
        'PROGRAM_STRUCTURES_URL missing for this environment. Check enviroment'
      );
      return;
    }

    log(
      `Posting program "${program.name}" (${
        program.uuid
      }) to ${PROGRAM_STRUCTURES_URL}`
    );

    response = await axios.post(PROGRAM_STRUCTURES_URL, program, {
      params: { token: PROGRAM_STRUCTURES_AUTH_TOKEN },
    });

    log(
      `Successfully posted program "${
        program.code
      }" to ${PROGRAM_STRUCTURES_URL}: ${response.data}`
    );

    return response.data;
  } catch (error) {
    log.error(
      `Error posting program "${program.code}" (${program.uuid}): ${error}`
    );
    throw error;
  }
};
