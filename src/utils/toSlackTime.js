const toSlackTime = function toSlackTime(dateObj, offset = 0) {
  const offsetDate = new Date(dateObj.getTime() + offset * 60 * 1000);

  const hour = `${offsetDate.getUTCHours()}`;
  const hourZeroPadded = hour.length === 1 ? `0${hour}` : hour;
  const minutes = `${offsetDate.getUTCMinutes()}`;
  const minutesZeroPadded = minutes.length === 1 ? `0${minutes}` : minutes;

  return `${hourZeroPadded}:${minutesZeroPadded}`;
};

export default toSlackTime;
