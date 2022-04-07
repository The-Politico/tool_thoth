export default function toNotionTime(dateObj) {
  const systemOffset = `${(dateObj.getTimezoneOffset()) / 60}`;
  const offsetZeroPadded = systemOffset.length === 1 ? `0${systemOffset}` : systemOffset;
  const offsetWithSign = parseInt(systemOffset, 10) > 0 ? `-${offsetZeroPadded}` : `+${offsetZeroPadded}`;

  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`;
  const monthZeroPadded = month.length === 1 ? `0${month}` : month;

  const day = `${dateObj.getDate()}`;
  const dayZeroPadded = day.length === 1 ? `0${day}` : day;

  const hour = `${dateObj.getHours()}`;
  const hourZeroPadded = hour.length === 1 ? `0${hour}` : hour;

  const minute = `${dateObj.getMinutes()}`;
  const minuteZeroPadded = minute.length === 1 ? `0${minute}` : minute;

  return `${year}-${monthZeroPadded}-${dayZeroPadded}T${hourZeroPadded}:${minuteZeroPadded}:00.000${offsetWithSign}:00`;
}
