const getAlertDatetimes = function getAlertDatetimes(alerts) {
  const alertTimes = Object
    .keys(alerts)
    .sort((a, b) => a - b);

  const alertDTs = alertTimes.map((hour) => {
    const dt = new Date();
    dt.setUTCHours(hour);
    dt.setUTCMinutes(0);
    dt.setUTCSeconds(0);
    dt.setUTCMilliseconds(0);

    return dt;
  });

  const firstTimeTomorrow = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000,
  );
  firstTimeTomorrow.setUTCHours(alertTimes[0]);
  firstTimeTomorrow.setUTCMinutes(0);
  firstTimeTomorrow.setUTCSeconds(0);
  firstTimeTomorrow.setUTCMilliseconds(0);

  alertDTs.push(firstTimeTomorrow);

  return alertDTs;
};

export default getAlertDatetimes;
