import fromSlackDateTime from 'Utils/fromSlackDateTime';
import getNextInterval from 'Utils/getNextInterval';

const validateFutureDate = function validateFutureDate(self, day, time) {
  const datetimeValue = fromSlackDateTime(
    day,
    time,
    self.state.tzOffset,
  );

  if (Number.isNaN(datetimeValue)) {
    return false;
  }

  /* If time within half hour from now, consider it past */
  if (datetimeValue.getTime() < getNextInterval().getTime()) {
    return false;
  }

  return true;
};

export default validateFutureDate;
