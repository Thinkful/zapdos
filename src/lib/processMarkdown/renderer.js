const colors = require('ansi-colors');
const log = require('fancy-log');
const marked = require('marked');
const hljs = require('highlight.js');

// Initialize the renderer
const renderer = new marked.Renderer();

renderer.codespan = code => `<code ng-non-bindable>${code}</code>`;

renderer.code = (code, lang) => {
  let codeHtml = code;

  try {
    // If lang is specified and it isn't "nohighlight", use
    // hljs.highlight with that language
    if (lang) {
      if (lang !== 'noghighlight') {
        codeHtml = hljs.highlight(lang.toLowerCase(), code).value;
      }
    } else {
      codeHtml = hljs.highlightAuto(code).value;
    }
  } catch (e) {
    log(colors.yellow('Highlight error!', e));
  }

  return `<pre class="hljs" ng-non-bindable>${codeHtml}</pre>`;
};

module.exports = renderer;
