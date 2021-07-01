import toDisplayTime from 'Utils/toDisplayTime';
import toDisplayDate from 'Utils/toDisplayDate';
import blocks from './blocks';

const view = function view(self) {
  const output = [];

  const {
    user,
    link,
    notes,
    headlines,
    publishDate,
  } = self.values;

  output.push(blocks.headline(headlines));

  const displayDate = toDisplayDate(publishDate);
  const displayTime = toDisplayTime(publishDate);
  output.push(blocks.when(displayDate, displayTime));

  output.push(blocks.user(user));

  if (notes) {
    output.push(blocks.notes(notes));
  }

  output.push(blocks.links(link));

  return {
    color: '#DC0228',
    blocks: output,
  };
};

export default view;
