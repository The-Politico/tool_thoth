import slack from 'Utils/slack/index';

import { HT_CMS_LINK_UPDATE } from 'Constants/actions';
import forms from 'Content/forms/index';

const nowAsap = async function button(event, payload, action) {
  const { view } = payload;

  const linkValue = action.value;

  let linkValid = true;
  if (linkValue.match(/https:\/\/cms.politico.com\/cms\/.*/) === null) {
    linkValid = false;
  }

  const form = forms.headlineTest(
    view,
  );

  await form.updateTimezone(payload.user.id);

  form.updateState({
    verifiedCMSLink: linkValid,
  });

  if (!form.state.showScheduler) {
    form.updateState({
      showScheduler: linkValid,
    });
  }

  slack.updateView({
    id: view.id,
    view: form.view(),
  });

  return true;
};

export default {
  type: HT_CMS_LINK_UPDATE,
  handler: nowAsap,
};
