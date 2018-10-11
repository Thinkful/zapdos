const changeSrcToAsset = require('./changeSrcToAsset');
const killStyles = require('./killStyles');
const replaceAframe = require('./replaceAframe');
const replaceCodepen = require('./replaceCodepen');
const replaceYoutube = require('./replaceYoutube');
const setTargetAttribute_blank = require('./setTargetAttribute_blank');

module.exports = [
  changeSrcToAsset,
  killStyles,
  replaceAframe,
  replaceCodepen,
  replaceYoutube,
  setTargetAttribute_blank,
];
