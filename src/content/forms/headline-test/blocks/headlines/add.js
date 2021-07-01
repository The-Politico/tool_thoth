import { HT_ADD_HEADLINE_CLICK } from 'Constants/actions';

export default {
  block_id: 'headlines:add',
  type: 'actions',
  elements: [
    {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Add New Option',
      },
      value: HT_ADD_HEADLINE_CLICK,
      action_id: HT_ADD_HEADLINE_CLICK,
    },
  ],
};
