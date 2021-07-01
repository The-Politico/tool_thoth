import { log } from 'Utils/console';
import htNewRequest from './ht-new-request';
import htEditRequest from './ht-edit-request';

const callbackHandlers = {
  [htNewRequest.callback]: htNewRequest.handler,
  [htEditRequest.callback]: htEditRequest.handler,

};

const viewSubmission = function viewSubmission(event, payload) {
  const { view } = payload;

  const callbackHandler = callbackHandlers[view.callback_id];

  if (!callbackHandler) {
    log('No callback handler: ', payload.view.callback_id);
    return false;
  }

  return callbackHandler(event, payload);
};

export default {
  type: 'view_submission',
  handler: viewSubmission,
};
