const parseAPI = function parseAPI(request) {
  try {
    const body = JSON.parse(request.body);
    if (body.token !== process.env.THOTH_API_TOKEN) {
      return false;
    }

    return body;
  } catch (e) {
    return false;
  }
};

export default parseAPI;
