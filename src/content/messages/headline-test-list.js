import toDisplayTime from 'Utils/toDisplayTime';
import toDisplayDate from 'Utils/toDisplayDate';

const headlineTestList = function headlineTestList(
  {
    error = false, rangeStart = null, rangeEnd = null, requests,
  } = {},
) {
  if (error) {
    let errorMsg = 'Oh no! 😞';

    if (!rangeStart && !rangeEnd) {
      errorMsg += ' Your range couldn\'t be interpretted.';
    } else if (!rangeStart) {
      errorMsg += ' The start of your range couldn\'t be interpretted.';
    } else if (!rangeEnd) {
      errorMsg += ' The end of your range couldn\'t be interpretted.';
    }

    errorMsg = `${errorMsg} Try formatting your ranges like this: `
      + '(MM/DD/YYYY HH:MM TZ).'
      + ' Remember to split your start and end range with a ">",'
      + ' or don\'t type anything after the slash command to get'
      + ' upcoming requests.';

    return errorMsg;
  }

  if (requests.length === 0) {
    if (rangeStart || rangeEnd) {
      return 'There are no headline tests in that range.';
    }

    return 'There are no upcoming headline tests.';
  }

  const startDisplay = rangeStart
    ? `${toDisplayDate(rangeStart)} at ${toDisplayTime(rangeStart)}`
    : undefined;
  const endDisplay = rangeEnd
    ? `${toDisplayDate(rangeEnd)} at ${toDisplayTime(rangeEnd)}`
    : undefined;

  if (!rangeStart && !rangeEnd) {
    return '––– Here are all the upcoming headline tests –––';
  }

  if (!rangeStart) {
    return `––– Here are all the headline tests before ${endDisplay} –––`;
  }

  if (!rangeStart) {
    return `––– Here are all the headline tests after ${startDisplay} –––`;
  }

  return `––– Here are all the headline tests between ${startDisplay} and ${endDisplay} –––`;
};

export default headlineTestList;
