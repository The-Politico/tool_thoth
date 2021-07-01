import crypto from 'crypto';
import querystring from 'querystring';

const parseSlack = function parseSlack(request) {
  const { THOTH_SLACK_SECRET } = process.env;

  const body = querystring.parse(request.body);
  const timestamp = request.headers['X-Slack-Request-Timestamp'];
  const slackSignature = request.headers['X-Slack-Signature'];

  if (Math.abs(new Date() - new Date(timestamp)) > 60 * 5) {
    // The request timestamp is more than five minutes from local time.
    // It could be a replay attack, so let's ignore it.
    return false;
  }

  const sigBasestring = `v0:${timestamp}:${request.body}`;
  const compareSignature = `v0=${crypto.createHmac('sha256', THOTH_SLACK_SECRET)
    .update(sigBasestring)
    .digest('hex')}`;

  const signatureMatches = crypto.timingSafeEqual(
    Buffer.from(slackSignature),
    Buffer.from(compareSignature),
  );

  if (!signatureMatches) {
    return false;
  }

  return body;
};

export default parseSlack;
