const { getExternalLink } = require('../utils');

const jqueryTarget =
  '[href]:' +
  'not([href*="courses.thinkful.com"]):' +
  'not([href*="thinkful.com"])';

module.exports = $ => {
  $(jqueryTarget).each((_, el) => {
    el = $(el);
    $(el).replaceWith(
      getExternalLink(el.attr('href'), el.text(), el.attr('alt'))
    );
  });
};
