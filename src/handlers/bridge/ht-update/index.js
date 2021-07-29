import slack from 'Utils/slack/index';
import { HEADLINE_TEST_CHANNEL } from 'Constants/locations';
import databases from 'Databases/index';
import { HT_UPDATE } from 'Constants/commands';
import messages from 'Content/messages/index';
import attachments from 'Content/attachments/index';
import { log } from 'Utils/console';
import { HEADLINE_TEST_BOT } from 'Constants/users';

const getAlertTime = function parseCustomAlertTime(event) {
  const now = new Date();
  const def = [
    now.getUTCHours(),
    now.getUTCMinutes() >= 30 ? '30' : '00',
  ];

  if (!event.alertTime) {
    return def;
  }

  const alertTimeSplit = event.alertTime.split(':');
  if (alertTimeSplit.length !== 2) {
    return def;
  }

  const parsedHour = parseInt(alertTimeSplit[0], 10);
  if (parsedHour < 1 || parsedHour > 23) {
    return def;
  }

  const minute = alertTimeSplit[1];
  if (minute !== '00' && minute !== '30') {
    return def;
  }

  return [
    alertTimeSplit[0],
    alertTimeSplit[1],
  ];
};

const notifyHeadlineTest = async function notifyHeadlineTest(event) {
  const [alertTimeHour, alertTimeMinute] = getAlertTime(event);

  const startRange = new Date();
  startRange.setUTCHours(alertTimeHour);
  startRange.setUTCMinutes(alertTimeMinute);
  startRange.setUTCSeconds(0);
  startRange.setUTCMilliseconds(0);

  const endRange = new Date(startRange.getTime() + 1800000);

  await databases.headlineTest.sort();
  const requests = await databases.headlineTest.get();

  const requestsForAlert = requests.filter((r) => {
    const publishTime = r.publishDate.getTime();
    return (
      publishTime >= startRange.getTime() && publishTime < endRange.getTime()
    );
  });

  log(`Bridge /  HT-Update  /  ${startRange} – ${endRange}  /  ${requestsForAlert.length} Requests Found  /\n`);

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
