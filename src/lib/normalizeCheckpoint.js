const getTimeEstimateHours = require('./getTimeEstimateHours');

const DEFAULT_ATTRIBUTES = {
  author: 'Thinkful',
  team: 'grading',
};

module.exports = async checkpoint => {
  // Ensure all attributes are present
  checkpoint.attributes = Object.assign(
    {
      // Alias name to title if not set
      title: checkpoint.attributes.name || 'Checkpoint',
    },
    DEFAULT_ATTRIBUTES,
    checkpoint.attributes
  );

  // Translate time estimate to hours
  checkpoint.attributes.timeHours = getTimeEstimateHours(
    checkpoint.attributes.time
  );

  // Delete `name` if it's present (use `title` instead)
  if (checkpoint.attributes.name) {
    delete checkpoint.attributes.name;
  }

  // Delete `type` if it's present (maintained w/ another tool)
  if (checkpoint.attributes.type) {
    delete checkpoint.attributes.type;
  }

  return checkpoint;
};
