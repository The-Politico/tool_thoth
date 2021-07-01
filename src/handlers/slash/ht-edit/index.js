import slack from 'Utils/slack/index';
import { HT_EDIT_REQUEST } from 'Constants/commands';
import forms from 'Content/forms/index';

const editHeadlineTest = async function editHeadlineTest(event) {
  const form = forms.headlineTestEdit();
  const view = await form.view();

  slack.newView({
    trigger: event.trigger_id,
    view,
  });

  return true;
};

export default {
  command: `/${HT_EDIT_REQUEST}`,
  handler: editHeadlineTest,
};
