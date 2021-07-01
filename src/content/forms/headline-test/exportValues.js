import gootenberg from 'Utils/gootenberg';
import slack from 'Utils/slack/index';
import fromSlackDateTime from 'Utils/fromSlackDateTime';
import inXSeconds from 'Utils/inXSeconds';

import { HEADLINE_TESTS_SHEET } from 'Constants/locations';
import database from 'Databases/headline-test/index';

const exportValues = async function exportValues(self) {
  const { id, state, values } = self;
  const allTests = await database.get();

  const existingRowIdx = allTests.findIndex((r) => r.id === id);
  const rowIdx = existingRowIdx === -1
    ? allTests.length + 1
    : existingRowIdx + 1;

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

  const publishStr = (publishDate && publishTime)
    ? fromSlackDateTime(publishDate, publishTime, state.tzOffset).getTime()
    : inXSeconds(300).getTime();

  const row = [
    [
      id,
      link,
      username,
      publishStr,
      `=date(1970, 1, 1)+D${rowIdx + 1}/86400000+VLOOKUP(Options!$B$3, Options!$E$2:$F$9, 2, 0)`,
      notes,
      ...headlines,
    ],
  ];

  if (existingRowIdx === -1) {
    // New Row
    await gootenberg.sheets.appendRows(
      HEADLINE_TESTS_SHEET(),
      row,
      {
        valueInputOption: 'USER_ENTERED',
      },
    );
  } else {
    // Update Row
    await gootenberg.sheetsAPI.spreadsheets.values.batchUpdate({
      auth: gootenberg.client,
      spreadsheetId: HEADLINE_TESTS_SHEET(),
      resource: {
        data: [
          {
            range: `A${rowIdx + 1}:P${rowIdx + 1}`,
            majorDimension: 'ROWS',
            values: row,
          },
        ],
        valueInputOption: 'USER_ENTERED',
      },
    });
  }

  database.sort();
};

export default exportValues;
