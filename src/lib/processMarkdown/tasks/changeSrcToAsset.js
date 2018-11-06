const _ = require('lodash');

/**
 * In markdown, * src= attributes point to relative URLs like 'foobar.png'
 *    This attribute is changed to asset=
 * In the learning app, a directive prepends the S3 URL prefix and the folder
 *    name before populating the src attribute.
 */
module.exports = $ => {
  _($('[src]'))
    .filter(el => !/^(https?)?:?\/\//i.test(el.getAttribute('src')))
    .forEach(el => {
      el.setAttribute('asset', el.getAttribute('src'));
      el.removeAttribute('src');
    });
};
