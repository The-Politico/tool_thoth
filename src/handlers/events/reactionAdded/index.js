import db from 'Databases/headline-test/index';
import { log } from 'Utils/console';

const reactionAdded = async function reactionAdded(event, payload) {
  const messagets = payload.event.item.ts;

  db.updateStatusByNotification(messagets, 'Started')
    .catch((e) => {
      if (e.errorCode !== '404') {
        log(e, 'error');
      }
    });

  return true;
};

export default {
  event: 'reaction_added',
  handler: reactionAdded,
};
