const processMarkdown = require('./processMarkdown');

const getCurriclumCheckpointFromLibraryFile = libFile => ({
  type: 'assignment',
  children: null,
  src: libFile.src,
  uuid: libFile.attributes.uuid,
  content: {
    body: processMarkdown(libFile.body),
  },
  time: libFile.attributes.time,
  name: libFile.attributes.name || 'Unknown',
  author: libFile.attributes.author || 'Unknown',
});

module.exports = modFile => ({
  type: 'course',
  src: modFile.src,
  name: modFile.name,
  id: modFile.code,
  code: modFile.code,
  uuid: modFile.uuid,
  version: modFile.version || '1',
  content: { body: '' },
  author: modFile.author || 'Unknown',
  parent: null,
  children: modFile.checkpoints.map(getCurriclumCheckpointFromLibraryFile),
});
