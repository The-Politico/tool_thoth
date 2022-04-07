import { UPDATE_INTERVAL } from '../constants/updates';

const getLastInterval = function getLastInterval() {
  const now = new Date();
  const nextTime = new Date(now.getTime() - UPDATE_INTERVAL);
  nextTime.setSeconds(0);
  nextTime.setMilliseconds(0);

  return nextTime;
};

export default getLastInterval;
