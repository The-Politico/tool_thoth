import slack from 'Utils/slack/index';
import { HEADLINE_TEST_CHANNEL } from 'Constants/locations';
import databases from 'Databases/index';
import { HT_UPDATE } from 'Constants/commands';
import messages from 'Content/messages/index';
import attachments from 'Content/attachments/index';
import { log } from 'Utils/console';
import { HEADLINE_TEST_BOT } from 'Constants/users';
import getNextInterval from 'Utils/getNextInterval';

const notifyHeadlineTest = async function notifyHeadlineTest() {
  const requestsForAlert = await databases.headlineTest.getUpcoming();

  log(`Bridge /  HT-Update  /  ${new Date().toISOString()} – ${getNextInterval().toISOString()}  /  ${requestsForAlert.length} Requests Found  /\n`);

  if (requestsForAlert.length > 0) {
    await slack.postMessage({
      ...HEADLINE_TEST_BOT,

      channel: HEADLINE_TEST_CHANNEL(),

      text: messages.headlineTestUpdate({
        requests: requestsForAlert,
      }),
    });

    requestsForAlert.forEach((r) => {
      slack.postMessage({
        ...HEADLINE_TEST_BOT,

        channel: HEADLINE_TEST_CHANNEL(),

        text: `*${r.headlines[0]}*`,

        attachments: [
          attachments
            .headlineTest({
              id: r.id,
              values: {
                user: r.user,
                link: r.link,
                publishDate: r.publishDate,
                notes: r.notes,
                headlines: r.headlines,
              },
            })
            .view(),
        ],
      });
    });
  }

  return true;
};

export default {
  command: HT_UPDATE,
  handler: notifyHeadlineTest,
};
