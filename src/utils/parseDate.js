const parseDate = function parseDate(str) {
  const dateObj = new Date(str);
  if (Number.isNaN(dateObj.getTime())) {
    return undefined;
  }

  return dateObj;
};

export default parseDate;
