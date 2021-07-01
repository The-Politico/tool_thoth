import { HT_EDIT_TIME_CLICK } from 'Constants/actions';

export default {
  block_id: 'when:edit',
  type: 'actions',
  elements: [
    {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Edit Publish Time',
      },
      value: HT_EDIT_TIME_CLICK,
      action_id: HT_EDIT_TIME_CLICK,
    },
  ],
};
