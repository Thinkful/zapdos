const MINUTES_PER_HOUR = 60;

module.exports = rawTime => {
  const hoursMatch = /^([\d\.]+)\shours?/.exec(rawTime);
  if (hoursMatch) {
    return Number(hoursMatch[1]);
  }

  const minutesMatch = /^([\d\.]+)\sminutes?/.exec(rawTime);
  if (minutesMatch) {
    // Convert minutes to hours
    return Number(minutesMatch[1]) / MINUTES_PER_HOUR;
  }

  return null;
};
