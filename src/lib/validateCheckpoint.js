const c = require('ansi-colors');
const log = require('fancy-log');

const VALID_TEAM_VALUES = ['careers', 'grading'];

const formatDuplicates = duplicates =>
  `[${duplicates.map(dup => `"${dup.attributes.title}"`).join(', ')}]`;

module.exports = async (checkpoint, checkpoints = null) => {
  // Fallback to this checkpoint
  checkpoints = checkpoints || [checkpoint];

  const errors = [];

  // Check for missing uuid
  if (!checkpoint.attributes.uuid) {
    const error =
      `CHECKPOINT_INVALID: Checkpoint "${checkpoint.src}" ` +
      `has no uuid. Run uuids command`;
    errors.push(error);
  }

  // Check for valid team
  if (VALID_TEAM_VALUES.indexOf(checkpoint.attributes.team) === -1) {
    const error =
      `CHECKPOINT_INVALID: Checkpoint ${checkpoint.src} ` +
      `has invalid team "${checkpoint.attributes.team}". ` +
      `Valid team values: ${VALID_TEAM_VALUES}`;
    errors.push(error);
  }

  // Check for missing time estimate
  if (typeof checkpoint.attributes.time !== 'number') {
    const error =
      `CHECKPOINT_INVALID: Checkpoint ${checkpoint.src} ` +
      `has a missing or invalid time estimate "${
        checkpoint.attributes.rawTime
      }". ` +
      `Times must be provided in the form "N hours" or "N minutes".`;
    // Temporarily log warning. This will throw an error and block the build
    // in the coming weeks, but we need to give the curric team time to backfill
    // missing data without blocking their release process. - KLL, 2019/06/14
    log.warn(c.yellow(error));
  }

  // Check for a unique uuid
  const checkpointsWithUuid = checkpoints.filter(
    cp => cp.attributes.uuid === checkpoint.attributes.uuid
  );
  if (checkpointsWithUuid.length > 1) {
    const error =
      `CHECKPOINT_INVALID: ${checkpointsWithUuid.length} ` +
      `checkpoints found with uuid "${checkpoint.attributes.uuid}": ` +
      `${formatDuplicates(checkpointsWithUuid)} - Expected 1`;
    errors.push(error);
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
};
