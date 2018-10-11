const colors = require('ansi-colors');
const log = require('fancy-log');

const { getNonSpecificSrc } = require('../utils');

/**
 * In markdown, <youtube source="ZRGB350ak.."></youtube>
 * Gets translated to an iframe tag wrapped in some nice video things
 */
module.exports = $ => {
  $('youtube[source]').each(el => {
    $(el).replaceWith(
      createVideoIFrame(getNonSpecificSrc($(el).attr('source')), $)
    );
  });

  const rogueYoutube = $('youtube').first();

  if (rogueYoutube.length) {
    log.warn(
      colors.yellow(
        `Warning: There seems to be a rogue youtube tag: ${rogueYoutube}`
      )
    );
  }
};
