import ellipsize from 'ellipsize';
import database from 'Databases/headline-test/index';
import blocks from './blocks';

const view = async function view(self) {
  const output = [];

  const requests = await database.get();
  const options = requests
    .filter((row) => row.publishDate.getTime() > (new Date()).getTime())
    .map((row) => {
      const firstHeadline = row.headlines.filter((h) => !!h)[0];

      const displayDate = Intl.DateTimeFormat('en-US').format(row.publishDate);

      return {
        value: row.id,
        label: `${displayDate} – ${ellipsize(firstHeadline, 30)}`,
      };
    });

  if (options.length > 0) {
    output.push(blocks.choose.input(options));

    output.push(blocks.choose.help);

    return {
      type: 'modal',
      title: blocks.titles.edit,
      submit: blocks.submits.edit,
      blocks: output,
      callback_id: self.type,
    };
  }

  output.push(blocks.choose.empty);

  return {
    type: 'modal',
    title: blocks.titles.edit,
    blocks: output,
    callback_id: self.type,
  };
};

export default view;
