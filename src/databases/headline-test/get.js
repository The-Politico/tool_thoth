import { HEADLINE_TESTS_SHEET } from 'Constants/locations';

import gootenberg from 'Utils/gootenberg';

const getDatabse = async function getDatabse() {
  const data = await gootenberg.parse.table(HEADLINE_TESTS_SHEET());

  return data.Requests.map((row) => ({
    id: row.id,
    link: row.link,
    user: row.last_updated_by,
    publishDate: new Date(parseInt(row.publish_date, 10)),
    notes: row.notes,
    headlines: [
      row.headline_one,
      row.headline_two,
      row.headline_three,
      row.headline_four,
      row.headline_five,
      row.headline_six,
      row.headline_seven,
      row.headline_eight,
      row.headline_nine,
      row.headline_ten,
    ].filter((h) => !!h),
  }));
};

export default getDatabse;
