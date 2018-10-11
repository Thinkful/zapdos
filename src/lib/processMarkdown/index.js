const marked = require('marked');

const createDom = require('./createDom');
const renderer = require('./renderer');
const tasks = require('./tasks');

marked.setOptions({
  renderer,
});

/**
 * Process a blob of markdown
 *
 * @param {String} markdown Blob of markdown text to process
 * @return {String} Html derived from processed markdown
 */
module.exports = markdown => {
  // Turn the markdown into an HTML String using the custom renderer
  const html = marked(markdown);

  // Turn the HTML String into a jQuery DOM object
  const $ = createDom(html);

  // Call each task on the jQuery DOM object
  tasks.forEach(task => task($));

  // Return the body as an HTML String
  return $('body').html();
};
