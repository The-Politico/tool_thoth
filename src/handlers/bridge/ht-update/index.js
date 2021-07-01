import slack from 'Utils/slack/index';
import { HEADLINE_TEST_CHANNEL } from 'Constants/locations';
import { HEADLINE_TESTS as alerts } from 'Constants/alerts';
import databases from 'Databases/index';
import { HT_UPDATE } from 'Constants/commands';
import messages from 'Content/messages/index';
import attachments from 'Content/attachments/index';

const alertTimes = Object
  .keys(alerts)
  .sort((a, b) => a - b);

const notifyHeadlineTest = async function notifyHeadlineTest(event) {
  const now = new Date();
  const nowUTCHour = event.alertTime || now.getUTCHours();

  const alertType = alerts[nowUTCHour];
  if (alertType) {
    const startRange = new Date();
    startRange.setUTCHours(nowUTCHour);
    startRange.setUTCMinutes(0);
    startRange.setUTCSeconds(0);
    startRange.setUTCMilliseconds(0);

    const alertIdx = alertTimes.findIndex((a) => a === `${nowUTCHour}`);
    const nextAlertTime = parseInt(alertTimes[alertIdx + 1], 10);

    const endRange = nextAlertTime
      ? new Date(
        startRange.getTime()
        // shift to next alert hour
        + (nextAlertTime - nowUTCHour)
        // convert hours to milliseconds
        * 60 * 60 * 1000,
      )
      : new Date(
        startRange.getTime()
        // shift to first alert the next day
        + (24 + (parseInt(alertTimes[0], 10) - parseInt(nowUTCHour, 10)))
        // convert hours to milliseconds
        * 60 * 60 * 1000,
      );

    const requests = await databases.headlineTest.get();

    const requestsForAlert = requests.filter((r) => {
      const publishTime = r.publishDate.getTime();
      return (
        publishTime > startRange.getTime() && publishTime < endRange.getTime()
      );
    });

    slack.postMessage({
      channel: HEADLINE_TEST_CHANNEL(),

      text: messages.headlineTestUpdate({
        type: alertType,
        requests: requestsForAlert,
      }),

      attachments: requestsForAlert.map(
        (r) => attachments
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
      ),
    });
  }

  return true;
};

export default {
  command: HT_UPDATE,
  handler: notifyHeadlineTest,
};
