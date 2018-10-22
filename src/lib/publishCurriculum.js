const updateCurriculumVersion = require('./updateCurriculumVersion');
const uploadCurriculumToS3 = require('./uploadCurriculumToS3');

module.exports = async (curriculum, libraryDirectory) => {
  await uploadCurriculumToS3(curriculum, libraryDirectory);
  await updateCurriculumVersion(curriculum);
};
