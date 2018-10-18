module.exports = async mod => {
  let error = null;

  // Check for errors
  if (!mod.code) {
    error = `MODULE_INVALID: Module "${mod.src}" has no code`;
  }
  if (!mod.uuid) {
    error = `MODULE_INVALID: Module "${
      mod.src
    }" has no uuid. Run uuids command`;
  }

  if (error) {
    throw new Error(error);
  }
};
