import slack from 'Utils/slack/index';
import { log } from 'Utils/console';
import forms from 'Content/forms/index';
import attachments from 'Content/attachments/index';
import messages from 'Content/messages/index';
import reportAnalytics from 'Utils/reportAnalytics';
import db from 'Databases/headline-test/index';

import { HT_NEW_REQUEST } from 'Constants/callbacks';
import { HEADLINE_TEST_CHANNEL } from 'Constants/locations';
import { HEADLINE_TEST_BOT } from 'Constants/users';

const newHeadlineRequest = async function newHeadlineRequest(event, payload) {
  const { view } = payload;

  const form = forms.headlineTest(view);

  form.updateTimezone(payload.user.id)
    .then(() => form.updateTimezone(payload.user.id))
    .then(() => form.updateValues(payload))
    .then(() => form.validate())
    .then(([formValid, errorMsg]) => {
      if (formValid) {
        return form
          .export()
          .then(() => {
            const analyticsSubhandler = form.state.useEditingMeta
              ? 'edit' : 'new';
            reportAnalytics({
              user: payload.user.id,
              handler: 'view_submission',
              subhandler: analyticsSubhandler,
            });

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
                }))
                .then((resp) => {
                  db.updateNotificationById(form.id, resp.ts);
                });
            }

            return new Promise((resolve) => resolve());
          });
      }
      /* If form not valid */

      return slack.postMessage({
        ...HEADLINE_TEST_BOT,
        channel: payload.user.id,
        text: errorMsg[0].text,
        blocks: errorMsg,
      });
    })
    .catch((e) => {
      log(e, 'error');
    });

  return {
    response_action: 'update',
    view: form.confirmation(),
  };
};

export default {
  callback: HT_NEW_REQUEST,
  handler: newHeadlineRequest,
};
