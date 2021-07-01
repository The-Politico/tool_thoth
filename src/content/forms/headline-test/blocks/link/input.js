import { HT_CMS_LINK_UPDATE } from 'Constants/actions';

export default (initial) => ({
  block_id: 'link:input',
  type: 'input',
  dispatch_action: true,
  element: {
    type: 'plain_text_input',
    action_id: HT_CMS_LINK_UPDATE,
    placeholder: {
      type: 'plain_text',
      text: 'Paste the link to your story from the CMS',
    },
    dispatch_action_config: {
      trigger_actions_on: ['on_character_entered'],
    },
    initial_value: initial,
  },
  label: {
    type: 'plain_text',
    text: 'CMS Link',
  },
});
