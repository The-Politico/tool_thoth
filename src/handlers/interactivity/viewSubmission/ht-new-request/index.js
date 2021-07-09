import slack from 'Utils/slack/index';
import { log } from 'Utils/console';
import forms from 'Content/forms/index';
import attachments from 'Content/attachments/index';
import messages from 'Content/messages/index';

import { HT_NEW_REQUEST } from 'Constants/callbacks';
import { HEADLINE_TEST_CHANNEL } from 'Constants/locations';
import { HEADLINE_TEST_BOT } from 'Constants/users';

const newHeadlineRequest = async function newHeadlineRequest(event, payload) {
  const { view } = payload;

  const form = forms.headlineTest(view);

  await form.updateTimezone(payload.user.id);

  form.updateValues(payload);

  const [formValid, dialogView] = await form.validate();

  if (formValid) {
    form
      .export()
      .then(() => {
        if (!form.values.publishDate) {
          const notificationText = messages.headlineTestNotification(
            form.state.useEditingMeta,
          );

          const notificationAttachmennt = attachments.headlineTest(
            { id: form.id },
          );

          return notificationAttachmennt
            .import()
            .then(() => slack.postMessage({
              ...HEADLINE_TEST_BOT,
              channel: HEADLINE_TEST_CHANNEL(),
              text: notificationText,
              attachments: [
                notificationAttachmennt.view(),
              ],
            }));
        }

        return new Promise((resolve) => resolve());
      })
      .catch((e) => {
        log(e, 'error');
      });

    return {
      response_action: 'update',
      view: dialogView,
    };
  }

  return {
    response_action: 'push',
    view: dialogView,
  };
};

export default {
  callback: HT_NEW_REQUEST,
  handler: newHeadlineRequest,
};
