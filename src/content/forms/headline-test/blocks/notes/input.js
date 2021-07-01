import { HT_NOTES_UPDATE } from 'Constants/actions';

export default (initial, edited = false) => ({
  block_id: 'notes:input',
  type: 'input',
  element: {
    type: 'plain_text_input',
    multiline: true,
    action_id: HT_NOTES_UPDATE,
    initial_value: initial,
    placeholder: {
      type: 'plain_text',
      text: edited
        ? 'Use this space to provide any extra information the homepage '
          + 'team should know about this story in regards to headlines'
        : 'Please use this space to indicate what you\'ve changed',
    },
  },
  label: {
    type: 'plain_text',
    text: 'Notes',
  },
  optional: true,
});
