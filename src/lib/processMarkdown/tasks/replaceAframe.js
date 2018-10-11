const _ = require('lodash');
const colors = require('ansi-colors');
const log = require('fancy-log');

const { createVideoIFrame, getIframe, getNonSpecificSrc } = require('../utils');

const aframeChain = ($, el) => {
  let source = el.getAttribute('src');
  const example = `<aframe src="${source}"></aframe>`;
  log(
    colors.yellow(
      `Deprecation: Aframes like this will not be supported soon: ${example}`
    )
  );

  let replacementEl;
  source = getNonSpecificSrc(source);

  if (source.match(/(youtu|vimeo)/)) {
    replacementEl = createVideoIFrame(source, $);
  } else {
    replacementEl = getIframe(source);
  }

  $(el).replaceWith(replacementEl);
};

module.exports = $ => _.chain($('aframe[src]')).each(el => aframeChain($, el));
