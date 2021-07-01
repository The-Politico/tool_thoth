const inXSeconds = function inXSeconds(secs) {
  const d = new Date();
  return new Date(d.getTime() + secs * 1000);
};

export default inXSeconds;
