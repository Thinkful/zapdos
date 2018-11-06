const log = require('fancy-log');

const postCurriculumRelease = require('./postCurriculumRelease');
const uploadCurriculumToS3 = require('./uploadCurriculumToS3');

module.exports = async (curriculum, libraryDirectory) => {
  await uploadCurriculumToS3(curriculum, libraryDirectory);
  log(`Uploaded curriculum for curriculum "${curriculum.id}" to s3`);

  await postCurriculumRelease(curriculum);
  log(`Posted curriculum release for curriculum "${curriculum.id}"`);

  return curriculum;
};
