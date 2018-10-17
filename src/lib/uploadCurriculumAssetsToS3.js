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

const getCheckpointAssetPathPattern = (child, libraryDirectory) =>
  `${libraryDirectory}/${child.src}/*.(${ASSET_EXTENSIONS.join('|')})`;

const getAssetPaths = async (curriculum, libraryDirectory) => {
  let paths = [];

  for (const child in curriculum.children) {
    const childPaths = await globby(
      getCheckpointAssetPathPattern(child, libraryDirectory)
    );
    paths = paths.concat(childPaths);
  }

  return paths;
};

module.exports = async (curriculum, libraryDirectory) => {
  const assetPaths = await getAssetPaths(curriculum, libraryDirectory);

  log(
    `Found ${assetPaths.length} asset${
      assetPaths.length === 1 ? '' : 's'
    } for Curriculum ${curriculum.code}`
  );

  for (const assetPath of assetPaths) {
    await uploadCurriculumAssetToS3(curriculum, assetPath);
  }
};
