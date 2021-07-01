const toDisplayTime = function toDisplayTime(
  d,
  timeZone = 'America/New_York',
) {
  return new Intl.DateTimeFormat('en-us', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  }).format(d);
};

export default toDisplayTime;
