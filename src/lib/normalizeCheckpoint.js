const DEFAULT_ATTRIBUTES = {
  author: 'Unknown author',
  team: 'grading',
  type: 'graded',
};

module.exports = async checkpoint => {
  // Ensure all attributes are present
  checkpoint.attributes = Object.assign(
    {
      // Alias name to title if not set
      title: checkpoint.attributes.name,
    },
    DEFAULT_ATTRIBUTES,
    checkpoint.attributes
  );

  return checkpoint;
};
