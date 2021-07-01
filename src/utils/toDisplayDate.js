const toDisplayDate = function toDisplayDate(
  d,
  timeZone = 'America/New_York',
) {
  return new Intl.DateTimeFormat('en-us', {
    timeZone,
    dateStyle: 'short',
  }).format(d);
};

export default toDisplayDate;
