import fromSlackDateTime from 'Utils/fromSlackDateTime';

const validateFutureDate = function validateFutureDate(self, day, time) {
  const datetimeValue = fromSlackDateTime(
    day,
    time,
    self.state.tzOffset,
  );

  if (Number.isNaN(datetimeValue)) {
    return false;
  }

  const now = (new Date()).getTime();

  /* If time within an hour from hour, consider it past */
  if (now > datetimeValue) {
    return false;
  }

  return true;
};

export default validateFutureDate;
