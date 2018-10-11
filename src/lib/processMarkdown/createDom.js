const _ = require('lodash');
const { JSDOM } = require('jsdom');
const jquery = require('jquery');

module.exports = function(xmlStr) {
  const html = _.template(
    '<html><head></head><body> <%= structure %> </body></html>'
  )({
    structure: xmlStr,
  });

  // console.log(xmlStr);

  return jquery(new JSDOM(html).window);
};
