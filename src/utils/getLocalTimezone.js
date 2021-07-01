const US_TIMEZONES = {
  240: {
    standard: null,
    daylight: 'EDT',
  },
  300: {
    standard: 'EST',
    daylight: 'CDT',
  },
  360: {
    standard: 'CST',
    daylight: 'MDT',
  },
  420: {
    standard: 'MST',
    daylight: 'PDT',
  },
  480: {
    standard: 'PST',
    daylight: null,
  },
};

const getLocalTimezone = function getLocalTimezone(
  defaultLabel, defaultOffset,
) {
  const now = new Date();

  const standardStart = new Date(`3/10/${now.getFullYear()} 2:00 am`);
  const daylightStart = new Date(`11/3/${now.getFullYear()} 2:00 am`);

  const mode = (
    now.getTime() > standardStart.getTime()
    && now.getTime() < daylightStart.getTime()
  )
    ? 'daylight'
    : 'standard';

  const offsetTz = US_TIMEZONES[now.getTimezoneOffset()];
  if (offsetTz) {
    const modeTz = offsetTz[mode];

    if (!modeTz) {
      return {
        offset: now.getTimezoneOffset() * -1,
        label: modeTz,
      };
    }
  }

  return {
    label: defaultLabel,
    offset: defaultOffset,
  };
};

export default getLocalTimezone;
