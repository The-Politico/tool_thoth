const fromSlackDateTime = function fromSlackDateTime(day, time, offset) {
  const tzOffsetHours = Math.round(offset / 60);
  const offestString = `UTC${tzOffsetHours > 0 ? `+${tzOffsetHours}` : tzOffsetHours}`;

  return new Date(`${day} ${time} ${offestString}`);
};

export default fromSlackDateTime;
