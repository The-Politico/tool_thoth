import { log } from 'Utils/console';
import viewSubmission from './viewSubmission';
import blockActions from './blockActions';

const typeHandlers = {
  [viewSubmission.type]: viewSubmission.handler,
  [blockActions.type]: blockActions.handler,
};

const interactivityHandler = function interactivityHandler(request, event) {
  const payload = JSON.parse(event.payload);

  const typeHandler = typeHandlers[payload.type];

  if (!typeHandler) {
    log('No type handler: ', payload.type);
    return false;
  }

  return typeHandler(event, payload);
};

export default interactivityHandler;
