import slack from 'Utils/slack/index';

import { HT_EDIT_TIME_CLICK } from 'Constants/actions';
import forms from 'Content/forms/index';

const htEditTime = async function htEditTime(event, payload) {
  const { view } = payload;
  const { id: viewId } = view;

  const form = forms.headlineTest(view)
    .updateState({ asap: false, formerlyAsap: true });

  await form.updateTimezone(payload.user.id);

  slack.updateView({
    id: viewId,
    view: form.view(),
  });

  return true;
};

export default {
  type: HT_EDIT_TIME_CLICK,
  handler: htEditTime,
};
