const DEFAULT_ATTRIBUTES = {
  author: 'Thinkful',
  team: 'grading',
  type: 'graded',
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

  // Delete `name` if it's present (use `title` instead)
  if (checkpoint.attributes.name) {
    delete checkpoint.attributes.name;
  }

  return checkpoint;
};
