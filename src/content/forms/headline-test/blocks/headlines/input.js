import toEnglishNumber from 'Utils/toEnglishNumber';
import { HT_HEADLINE_LINK_UPDATE } from 'Constants/actions';
import { MIN_HEADLINES } from '../../constants';

export default (idx, initial) => ({
  block_id: `headlines:input:${toEnglishNumber(idx + 1)}`,
  type: 'input',
  element: {
    type: 'plain_text_input',
    action_id: HT_HEADLINE_LINK_UPDATE[idx],
    placeholder: {
      type: 'plain_text',
      text: 'Type an idea for a headline...',
    },
    initial_value: initial,
  },
  label: {
    type: 'plain_text',
    text: idx === 0
      ? 'Original headline'
      : `Alternative headline ${toEnglishNumber(idx)}`,
  },
  optional: idx > MIN_HEADLINES - 1,
});
