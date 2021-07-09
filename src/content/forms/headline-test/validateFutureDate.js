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

  /* If time within half hour from now, consider it past */
  if (datetimeValue.getTime() < now + 1800000) {
    return false;
  }

  return true;
};

export default validateFutureDate;
