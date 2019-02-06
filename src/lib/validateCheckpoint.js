const VALID_TEAM_VALUES = ['careers', 'grading'];

const formatDuplicates = duplicates =>
  `[${duplicates.map(dup => `"${dup.attributes.title}"`).join(', ')}]`;

module.exports = async (checkpoint, checkpoints = null) => {
  // Fallback to this checkpoint
  checkpoints = checkpoints || [checkpoint];

  let error = null;

  // Check for missing uuid
  if (!checkpoint.attributes.uuid) {
    error = `CHECKPOINT_INVALID: Checkpoint "${
      checkpoint.src
    }" has no uuid. Run uuids command`;
  }

  // Check for valid team
  if (VALID_TEAM_VALUES.indexOf(checkpoint.attributes.team) === -1) {
    error = `CHECKPOINT_INVALID: Checkpoint ${
      checkpoint.src
    } has invalid team "${
      checkpoint.attributes.team
    }". Valid team values: ${VALID_TEAM_VALUES}`;
  }

  // Check for a unique uuid
  const checkpointsWithUuid = checkpoints.filter(
    cp => cp.attributes.uuid === checkpoint.attributes.uuid
  );
  if (checkpointsWithUuid.length > 1) {
    error =
      `CHECKPOINT_INVALID: ${checkpointsWithUuid.length} ` +
      `checkpoints found with uuid "${checkpoint.attributes.uuid}": ` +
      `${formatDuplicates(checkpointsWithUuid)} - Expected 1`;
  }

  if (error) {
    throw new Error(error);
  }
};
