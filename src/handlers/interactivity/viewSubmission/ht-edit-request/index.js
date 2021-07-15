import forms from 'Content/forms/index';
import reportAnalytics from 'Utils/reportAnalytics';

import { HT_EDIT_REQUEST } from 'Constants/callbacks';

const newHeadlineRequest = async function newHeadlineRequest(event, payload) {
  const { view } = payload;

  const editForm = forms.headlineTestEdit(view);
  editForm.updateValues(payload);
  const requestId = editForm.values.request;

  const requestForm = forms.headlineTest(requestId);
  await requestForm.updateTimezone(payload.user.id);
  await requestForm.import();

  reportAnalytics({
    user: payload.user.id,
    handler: 'view_submission',
    subhandler: 'request-edit',
  });

  return {
    response_action: 'update',
    view: requestForm.view(),
  };
};

export default {
  callback: HT_EDIT_REQUEST,
  handler: newHeadlineRequest,
};
