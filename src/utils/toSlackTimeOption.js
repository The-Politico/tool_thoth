const dateToSlackTimeOption = function toSlackTimeOption(dateObj, offset = 0) {
  const offsetDate = new Date(dateObj.getTime() + offset * 60 * 1000);

  const hour = offsetDate.getUTCHours();

  const hourBaseTwelve = hour % 12;
  const amPm = hour > 12 ? 'PM' : 'AM';

  const minutes = offsetDate.getUTCMinutes();
  const nearestHalfHour = minutes >= 30 ? '30' : '00';

  return {
    text: {
      type: 'plain_text',
      text: `${hourBaseTwelve}:${nearestHalfHour} ${amPm}`,
    },
    value: `${hour}:${nearestHalfHour}`,
  };
};

const stringToSlackTimeOption = function toSlackTimeOption(dateStr) {
  const [hour, minute] = dateStr.split(':');
  const hourBaseTwelve = parseInt(hour, 10) % 12;
  const amPm = parseInt(hour, 10) > 12 ? 'PM' : 'AM';

  return {
    text: {
      type: 'plain_text',
      text: `${hourBaseTwelve}:${minute} ${amPm}`,
    },
    value: dateStr,
  };
};

export {
  dateToSlackTimeOption,
  stringToSlackTimeOption,
};
