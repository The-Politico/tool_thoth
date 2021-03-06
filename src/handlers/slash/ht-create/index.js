import slack from 'Utils/slack/index';
import { HT_NEW_REQUEST } from 'Constants/commands';
import forms from 'Content/forms/index';
import reportAnalytics from 'Utils/reportAnalytics';

const createHeadlineTest = function createHeadlineTest(event) {
  const view = forms.headlineTest().view();

  slack.newView({
    trigger: event.trigger_id,
    view,
  });

  reportAnalytics({
    user: event.user_id,
    handler: 'slash',
    subhandler: 'create',
  });

  return true;
};

export default {
  command: `/${HT_NEW_REQUEST}`,
  handler: createHeadlineTest,
};
