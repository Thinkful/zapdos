module.exports = async program => {
  let error = null;

  // Check for errors
  if (!program.name) {
    error = `PROGRAM_INVALID: Program "${program.src}" has no name`;
  }

  if (!program.code) {
    if (program.slug) {
      error = `PROGRAM_INVALID: Program ${program.src} has a "slug" defined. Maybe you meant to use "code"?`
    } else {
      error = `PROGRAM_INVALID: Program "${program.src}" has no "code" defined`;
    }
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
