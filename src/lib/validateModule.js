const formatDuplicates = duplicates =>
  `[${duplicates.map(dup => `"${dup.name}"`).join(', ')}]`;

module.exports = async (mod, mods = null) => {
  // Fallback to this module
  mods = mods || [mod];

  let error = null;

  // Check for missing fields
  if (!mod.code) {
    error = `MODULE_INVALID: Module "${mod.src}" has no code`;
  }
  if (!mod.uuid) {
    error = `MODULE_INVALID: Module "${
      mod.src
    }" has no uuid. Run uuids command`;
  }
  if (!mod.name) {
    error = `MODULE_INVALID: Module "${mod.src}" has no name`;
  }

  // Check for a unique code
  const modsWithCode = mods.filter(m => m.code === mod.code);
  if (modsWithCode.length > 1) {
    error =
      `MODULE_INVALID: ${modsWithCode.length} ` +
      `modules found with code "${mod.code}": ` +
      `${formatDuplicates(modsWithCode)} - Expected 1`;
  }

  // Check for a unique uuid
  const modsWithUuid = mods.filter(m => m.uuid === mod.uuid);
  if (modsWithUuid.length > 1) {
    error =
      `MODULE_INVALID: ${modsWithUuid.length} ` +
      `modules found with uuid "${mod.uuid}": ` +
      `${formatDuplicates(modsWithUuid)} - Expected 1`;
  }

  if (error) {
    throw new Error(error);
  }
};
