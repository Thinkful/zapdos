const GH_BASE_URL = 'https://github.com';

module.exports = circleRepoUrl => {
  const matches = /git@github.com:(.+)\.git/.exec(circleRepoUrl);

  if (!matches || matches.length < 2) {
    return null;
  }

  return `${GH_BASE_URL}/${matches[1]}`;
};
