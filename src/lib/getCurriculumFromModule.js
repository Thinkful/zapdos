const getCurriclumCheckpointFromLibraryFile = libFile => ({
  type: 'checkpoint',
  children: null,
  src: libFile.src,
  uuid: libFile.uuid,
  content: {
    body: '<p>Hello world</p>',
  },
  time: libFile.time,
  name: libFile.name || 'Unknown',
  author: libFile.author || 'Unknown',
});

module.exports = modFile => ({
  type: 'course',
  src: modFile.src,
  name: modFile.name,
  id: modFile.code,
  code: modFile.code,
  version: '1',
  content: { body: '' },
  author: modFile.author || 'Unknown',
  parent: null,
  children: modFile.checkpoints.map(getCurriclumCheckpointFromLibraryFile),
});
