const c = require('ansi-colors');
const log = require('fancy-log');
const globby = require('globby');

const uploadCurriculumAssetToS3 = require('./uploadCurriculumAssetToS3');

const ASSET_EXTENSIONS = [
  'csv',
  'gif',
  'jpg',
  'jpeg',
  'json',
  'jpeg',
  'm4a',
  'mov',
  'mp3',
  'mp4',
  'mkv',
  'ogg',
  'otf',
  'png',
  'psd',
  'svg',
  'tar',
  'ttf',
  'wav',
  'webm',
  'webp',
  'woff',
  'xml',
  'zip',
];

const getAssetPathPattern = (curriculum, libraryDirectory) =>
  `${libraryDirectory}/(${curriculum.children
    .map(checkpoint => checkpoint.src)
    .join('|')})/*.(${ASSET_EXTENSIONS.join('|')})`;

const getAssetPaths = async (curriculum, libraryDirectory) => {
  const paths = await globby(getAssetPathPattern(curriculum, libraryDirectory));
  return paths;
};

module.exports = async (curriculum, libraryDirectory) => {
  const assetPaths = await getAssetPaths(curriculum, libraryDirectory);

  log(
    `Found ${assetPaths.length} asset${
      assetPaths.length === 1 ? '' : 's'
    } for Curriculum ${curriculum.code}:`
  );

  return new Promise(async (resolve, reject) => {
    try {
      for (const assetPath of assetPaths) {
        await uploadCurriculumAssetToS3(curriculum, assetPath);
      }

      resolve(assetPaths);
    } catch (error) {
      reject(error);
    }
  });
};
