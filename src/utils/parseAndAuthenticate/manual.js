const parseManual = function parseManual(request) {
  if (request.body.token !== process.env.THOTH_API_TOKEN) {
    return false;
  }

  return request.body;
};

export default parseManual;
