import getNextHour from './getNextHour';

const getLastHour = function getLastHour() {
  const lastHour = getNextHour();
  lastHour.setHours(lastHour.getHours() - 1);
  return lastHour;
};

export default getLastHour;
