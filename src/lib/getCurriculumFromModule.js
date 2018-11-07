const processMarkdown = require('./processMarkdown');

const getId = modFile =>
  `${modFile.code}-v${modFile.version || 1}`.toLowerCase();

const getCurriclumCheckpointFromLibraryFile = libFile => ({
  type: 'checkpoint',
  children: null,
  src: libFile.src,
  uuid: libFile.attributes.uuid,
  content: {
    body: processMarkdown(libFile.body),
  },
  time: libFile.attributes.time,
  name: libFile.attributes.title || 'Unknown',
  author: libFile.attributes.author || 'Unknown',
});

module.exports = modFile => ({
  type: 'course',
  src: modFile.src,
  name: modFile.name,
  id: getId(modFile),
  code: modFile.code,
  uuid: modFile.uuid,
  version: modFile.version || '1',
  content: { body: '' },
  author: modFile.author || 'Unknown',
  parent: null,
  children: modFile.checkpoints.map(getCurriclumCheckpointFromLibraryFile),
});
