import { log } from 'Utils/console';
import parseSlack from './slack';
import parseManual from './manual';
import parseAPI from './api';

const parseAndAuthenticate = function parseAndAuthenticate(request) {
  if (request.headers && (
    request.headers['X-Slack-Signature']
    || request.headers['x-slack-signature']
  )) {
    log(` Request /  Slack  /  ${request.httpMethod}  /  ${typeof request.body}`);
    return parseSlack(request);
  }

  if (typeof request.body === 'object') {
    if (request.body.manual === true) {
      log(` Request /  Manual  /  ${request.httpMethod}  /  ${typeof request.body}`);
      return parseManual(request);
    }
  }

  if (request.httpMethod) {
    log(` Request /  API  /  ${request.httpMethod}  /  ${typeof request.body}`);
    return parseAPI(request);
  }

  log(` Request /  Unknown  /  ${request.httpMethod}  /  ${typeof request.body}`);
  return false;
};

export default parseAndAuthenticate;
