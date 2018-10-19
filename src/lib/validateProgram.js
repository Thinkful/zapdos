module.exports = async program => {
  let error = null;

  // Check for errors
  if (!program.name) {
    error = `PROGRAM_INVALID: Program "${program.src}" has no name`;
  }
  if (!program.uuid) {
    error = `PROGRAM_INVALID: Program "${
      program.src
    }" has no uuid. Run uuids command`;
  }

  if (error) {
    throw new Error(error);
  }
};
