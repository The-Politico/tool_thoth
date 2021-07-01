import toEnglishNumber from 'Utils/toEnglishNumber';
import { HT_HEADLINE_LINK_UPDATE } from 'Constants/actions';

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
    text: `Option ${toEnglishNumber(idx + 1)}`,
  },
  optional: true,
});
