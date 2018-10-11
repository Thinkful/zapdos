const colors = require('ansi-colors');
const log = require('fancy-log');

module.exports = $ => {
  if ($('style').length) {
    log(colors.yellow("Style tags found...and they're gone!"));
    $('style').replaceWith('');
  }
};
