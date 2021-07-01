import fromSlackDateTime from 'Utils/fromSlackDateTime';
import getAlertDatetimes from 'Utils/getAlertDatetimes';
import { HEADLINE_TESTS as alerts } from 'Constants/alerts';

const isBeforeNextAlert = function isBeforeNextAlert(self) {
  if (self.state.asap) {
    return true;
  }

  const datetimeValue = fromSlackDateTime(
    self.values.publishDate,
    self.values.publishTime,
    self.state.tzOffset,
  );

  const alertTimes = getAlertDatetimes(alerts);

  const now = new Date();
  const nextAlertTime = alertTimes.find((a) => now < a);

  return datetimeValue < nextAlertTime;
};

export default isBeforeNextAlert;
