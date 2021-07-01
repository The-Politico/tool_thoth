import slack from 'Utils/slack/index';

import { HT_NOW_ASAP_CLICK } from 'Constants/actions';
import forms from 'Content/forms/index';

const htNowAsap = async function htNowAsap(event, payload) {
  const { view } = payload;
  const { id: viewId } = view;

  const form = forms.headlineTest(view)
    .updateState({ asap: true, verifiedDate: true });

  await form.updateTimezone(payload.user.id);

  slack.updateView({
    id: viewId,
    view: form.view(),
  });

  return true;
};

export default {
  type: HT_NOW_ASAP_CLICK,
  handler: htNowAsap,
};
