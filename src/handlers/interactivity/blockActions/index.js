import { log } from 'Utils/console';

import {
  HT_SEE_REQUESTS_CLICK,
  HT_SEE_STORY_CLICK,
} from 'Constants/actions';

import htAddHeadline from './ht-add-headline';
import htEditTime from './ht-edit-time';
import htNowAsap from './ht-now-asap';
import ignoreLinkClick from './ignore-link-click';
import htCMSLink from './ht-cms-link';
import htTimeScheduler from './ht-time-scheduler';
import htDateScheduler from './ht-date-scheduler';

const actionHandlers = {
  [htAddHeadline.type]: htAddHeadline.handler,
  [htEditTime.type]: htEditTime.handler,
  [htNowAsap.type]: htNowAsap.handler,
  [htCMSLink.type]: htCMSLink.handler,
  [htTimeScheduler.type]: htTimeScheduler.handler,
  [htDateScheduler.type]: htDateScheduler.handler,

  /* Ignoring these button clicks */
  [HT_SEE_REQUESTS_CLICK]: ignoreLinkClick.handler,
  [HT_SEE_STORY_CLICK]: ignoreLinkClick.handler,
};

const blockActions = async function blockActions(event, payload) {
  const { actions } = payload;
  const action = actions[0];

  const actionHandler = actionHandlers[action.action_id];

  if (!actionHandler) {
    log('No block action handler: ', action.action_id);
    return false;
  }

  return actionHandler(event, payload, action);
};

export default {
  type: 'block_actions',
  handler: blockActions,
};
