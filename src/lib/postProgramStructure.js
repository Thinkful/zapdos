const axios = require('axios');
const log = require('fancy-log');

const {
  PROGRAM_STRUCTURES_AUTH_TOKEN,
  PROGRAM_STRUCTURES_URL,
} = require('../config');

module.exports = async program => {
  try {
    response = await axios.post(PROGRAM_STRUCTURES_URL, program, {
      token: PROGRAM_STRUCTURES_AUTH_TOKEN,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      `Error posting program with code ` +
      `${program.code} (${program.uuid}): ${error}`;
    log.error(errorMessage);
    throw error;
  }
};
