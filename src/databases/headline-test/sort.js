import gootenberg from 'Utils/gootenberg';
import { HEADLINE_TESTS_SHEET } from 'Constants/locations';

const sort = async function sort() {
  return gootenberg.sheetsAPI.spreadsheets.batchUpdate({
    auth: gootenberg.client,
    spreadsheetId: HEADLINE_TESTS_SHEET(),
    resource: {
      requests: [
        {
          sortRange: {
            range: {
              sheetId: 0,
              startRowIndex: 1,
              startColumnIndex: 0,
            },
            sortSpecs: [
              {
                sortOrder: 'ASCENDING',
                dimensionIndex: 3,
              },
            ],
          },
        },
      ],
    },
  });
};

export default sort;
