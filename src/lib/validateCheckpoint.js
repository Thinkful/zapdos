const throwError = error => {};

module.exports = async checkpoint => {
  let error = null;

  // Check for errors
  if (!checkpoint.attributes.uuid) {
    error = `CHECKPOINT_INVALID: Checkpoint "${
      checkpoint.src
    }" has no uuid. Run uuids command`;
  }

  if (error) {
    throw new Error(error);
  }
};
