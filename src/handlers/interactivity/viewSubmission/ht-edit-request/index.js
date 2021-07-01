import forms from 'Content/forms/index';

import { HT_EDIT_REQUEST } from 'Constants/callbacks';

const newHeadlineRequest = async function newHeadlineRequest(event, payload) {
  const { view } = payload;

  const editForm = forms.headlineTestEdit(view);
  editForm.updateValues(payload);
  const requestId = editForm.values.request;

  const requestForm = forms.headlineTest(requestId);
  await requestForm.updateTimezone(payload.user.id);
  await requestForm.import();

  return {
    response_action: 'update',
    view: requestForm.view(),
  };
};

export default {
  callback: HT_EDIT_REQUEST,
  handler: newHeadlineRequest,
};
