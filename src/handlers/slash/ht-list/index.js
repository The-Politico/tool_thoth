import slack from 'Utils/slack/index';
import parseDate from 'Utils/parseDate';
import databases from 'Databases/index';

import { HT_LIST_REQUEST } from 'Constants/commands';
import messages from 'Content/messages/index';
import attachments from 'Content/attachments/index';

import reportAnalytics from 'Utils/reportAnalytics';

const editHeadlineTest = async function editHeadlineTest(event) {
  const requests = await databases.headlineTest.get();

  const filterString = event.text;
  const [rangeStartString, rangeEndString] = filterString.split('>');

  const rangeStart = parseDate(rangeStartString);
  const rangeEnd = parseDate(rangeEndString);

  if (
    (!!rangeStartString && !rangeStart)
    || (!!rangeEndString && !rangeEnd)
  ) {
    return messages.headlineTestList({
      error: true,
      rangeStart,
      rangeEnd,
    });
  }

  const now = new Date().getTime();
  const startTime = rangeStart ? rangeStart.getTime() : undefined;
  const endTime = rangeEnd ? rangeEnd.getTime() : undefined;

  const requestsToDisplay = requests.filter((r) => {
    const publishTime = r.publishDate.getTime();

    if (!startTime && !endTime) {
      return publishTime > now;
    }

    if (startTime && endTime) {
      return publishTime > startTime && publishTime < endTime;
    }

    if (startTime && !endTime) {
      return publishTime > startTime;
    }

    if (!startTime && endTime) {
      return publishTime < endTime;
    }

    return true;
  });

  if (requestsToDisplay.length === 0) {
    return messages.headlineTestList({
      requests: requestsToDisplay,
      rangeStart,
      rangeEnd,
    });
  }

  const message = {
    text: messages.headlineTestList({
      requests: requestsToDisplay,
      rangeStart,
      rangeEnd,
    }),

    attachments: requestsToDisplay.map(
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
  };

  slack.dm(event.user_id, message);

  reportAnalytics({
    user: event.user_id,
    handler: 'slash',
    subhandler: 'list',
  });

  return true;
};

export default {
  command: `/${HT_LIST_REQUEST}`,
  handler: editHeadlineTest,
};
