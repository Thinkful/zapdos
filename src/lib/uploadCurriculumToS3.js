const uploadCurriculumBodyToS3 = require('./uploadCurriculumBodyToS3');
const uploadCurriculumAssetsToS3 = require('./uploadCurriculumAssetsToS3');

module.exports = async (curriculum, libraryDirectory) => {
  await uploadCurriculumAssetsToS3(curriculum, libraryDirectory);
  await uploadCurriculumBodyToS3(curriculum);
};
