const verifyHeadlineTest = async function verifyHeadlineTest(event, payload) {
  return { challenge: payload.challenge };
};

export default {
  event: 'url_verification',
  handler: verifyHeadlineTest,
};
