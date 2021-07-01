const toSlackDate = function toSlackDate(dateObj, offset = 0) {
  const offsetDate = new Date(dateObj.getTime() + offset * 60 * 1000);

  const year = offsetDate.getUTCFullYear();
  const month = `${offsetDate.getUTCMonth() + 1}`;
  const monthZeroPadded = month.length === 1 ? `0${month}` : month;
  const day = offsetDate.getUTCDate();
  const dayZeroPadded = day.length === 1 ? `0${day}` : day;

  return `${year}-${monthZeroPadded}-${dayZeroPadded}`;
};

export default toSlackDate;
