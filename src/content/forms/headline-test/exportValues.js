import slack from 'Utils/slack/index';
import fromSlackDateTime from 'Utils/fromSlackDateTime';

import database from 'Databases/headline-test/index';
import getLastInterval from 'Utils/getLastInterval';

const exportValues = async function exportValues(self) {
  const { id, state, values } = self;
  const existingRow = await database.getById(id);
  const rowExists = !!existingRow;

  const {
    user,
    link,
    publishDate,
    publishTime,
    notes,
    headlines,
  } = values;

  const userInfo = await slack.getUserInfo(user);
  const username = userInfo.user.real_name;

  const fullPublishDate = (publishDate && publishTime)
    ? fromSlackDateTime(publishDate, publishTime, state.tzOffset)
    : getLastInterval();

  if (!rowExists) {
    await database.append({
      id,
      link,
      user: username,
      publishDate: fullPublishDate,
      headlines,
      notes,
    });
  } else {
    await database.updateById(id, {
      link,
      user: username,
      publishDate: fullPublishDate,
      headlines,
      notes,
    });
  }
};

export default exportValues;
