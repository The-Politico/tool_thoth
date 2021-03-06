import { log } from 'Utils/console';
import urlVerification from './urlVerification';
// import reactionAdded from './reactionAdded';
// import message from './message';

const typeHandlers = {
  [urlVerification.event]: urlVerification.handler,

  /* Going to deploy with this feature turned off for now */
  // [reactionAdded.event]: reactionAdded.handler,
  // [message.event]: message.handler,
};

const eventsHandler = function eventsHandler(request, event) {
  const payload = JSON.parse(request.body);

  const type = payload.type === 'event_callback'
    ? payload.event.type : payload.type;

  const typeHandler = typeHandlers[type];

  if (!typeHandler) {
    log(`No type handler: ${type}`, 'warning');
    return false;
  }

  return typeHandler(event, payload);
};

export default eventsHandler;
