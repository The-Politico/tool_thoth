import slack from 'Utils/slack/index';

import { HT_ADD_HEADLINE_CLICK } from 'Constants/actions';
import forms from 'Content/forms/index';

const htAddHealine = async function htAddHealine(event, payload) {
  const { view } = payload;
  const { id: viewId } = view;

  const form = forms.headlineTest(view);
  form.updateState({
    headlineOptions: form.state.headlineOptions + 1,
  });

  await form.updateTimezone(payload.user.id);

  slack.updateView({
    id: viewId,
    view: form.view(),
  });

  return true;
};

export default {
  type: HT_ADD_HEADLINE_CLICK,
  handler: htAddHealine,
};
