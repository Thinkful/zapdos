module.exports = (src, height = null, width = null) =>
  `<iframe ` +
  `${height !== null ? `height="${height}" ` : ''}` +
  `${width !== null ? `width="${width}" ` : ''}` +
  `src="${source}" frameborder="0" allowfullscreen=""></iframe>`;
