const _ = require('lodash');
const colors = require('ansi-colors');
const log = require('fancy-log');

const { getIframe } = require('../utils');

const codepenEach = ($, el) => {
  const source =
    `//codepen.io/team/thinkful/embed/` +
    `${$(el).attr('source')}?height="440"&theme-id=9607`;

  const codepenIframe = getIframe(source, 444);

  $(el).replaceWith($.parseHTML(codepenIframe));
};

module.exports = $ => {
  $('codepen[source]').each(el => codepenEach($, el));

  const rogueCodepen = $('codepen').first();

  if (rogueCodepen.length) {
    log.warn(
      colors.yellow(
        `Warning: There seems to be a rogue codepen tag: ${rogueCodepen}`
      )
    );
  }
};
