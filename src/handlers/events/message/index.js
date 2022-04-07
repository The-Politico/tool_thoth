import db from 'Databases/headline-test/index';
import { log } from 'Utils/console';

const message = async function message(event, payload) {
  const messagets = payload.event.thread_ts;

  db.updateStatusByNotification(messagets, 'Complete')
    .catch((e) => {
      if (e.errorCode !== '404') {
        log(e, 'error');
      }
    });

  return true;
};

export default {
  event: 'message',
  handler: message,
};
