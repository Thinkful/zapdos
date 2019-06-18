const MINUTES_PER_HOUR = 60;

module.exports = checkpoint => {
  const {
    attributes: { time },
  } = checkpoint;
  const hoursMatch = /^([\d]+)\shours?/.exec(time);
  if (hoursMatch) {
    return Number(hoursMatch[1]);
  }

  const minutesMatch = /^([\d]+)\sminutes?/.exec(time);
  if (minutesMatch) {
    // Convert minutes to hours
    return Number(minutesMatch[1]) / MINUTES_PER_HOUR;
  }

  return null;
};
