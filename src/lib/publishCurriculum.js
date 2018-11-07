const log = require('fancy-log');

const postCurriculumRelease = require('./postCurriculumRelease');
const uploadCurriculumToS3 = require('./uploadCurriculumToS3');

module.exports = async (curriculum, libraryDirectory) => {
  await uploadCurriculumToS3(curriculum, libraryDirectory);
  log(`Uploaded curriculum "${curriculum.id}" to s3`);

  await postCurriculumRelease(curriculum);
  log(`Posted release for curriculum "${curriculum.id}"`);

  return curriculum;
};
