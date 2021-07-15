import slack from 'Utils/slack/index';
import { HT_EDIT_REQUEST } from 'Constants/commands';
import forms from 'Content/forms/index';
import reportAnalytics from 'Utils/reportAnalytics';

const editHeadlineTest = async function editHeadlineTest(event) {
  const form = forms.headlineTestEdit();
  const view = await form.view();

  slack.newView({
    trigger: event.trigger_id,
    view,
  });

  reportAnalytics({
    user: event.user_id,
    handler: 'slash',
    subhandler: 'edit',
  });

  return true;
};

export default {
  command: `/${HT_EDIT_REQUEST}`,
  handler: editHeadlineTest,
};
