import slack from 'Utils/slack/index';
import getValue from 'Utils/getValueFromSlackPayload';

import {
  HT_SCHEDULED_DATE_UPDATE,
  HT_SCHEDULED_TIME_UPDATE,
} from 'Constants/actions';
import forms from 'Content/forms/index';

const scheduler = async function button(event, payload) {
  const { view } = payload;
  const { id: viewId } = view;

  const form = forms.headlineTest(view);
  await form.updateTimezone(payload.user.id);

  const dateValue = getValue(
    view.state.values, 'when:inputs', HT_SCHEDULED_DATE_UPDATE,
  );
  const timeValue = getValue(
    view.state.values, 'when:inputs', HT_SCHEDULED_TIME_UPDATE,
  );

  if (dateValue && timeValue) {
    const validDate = form.validateFutureDate(dateValue, timeValue);
    form.updateState({ verifiedDate: validDate });
  }

  await form.updateTimezone(payload.user.id);

  slack.updateView({
    id: viewId,
    view: form.view(),
  });

  return true;
};

export default {
  type: HT_SCHEDULED_TIME_UPDATE,
  handler: scheduler,
};
