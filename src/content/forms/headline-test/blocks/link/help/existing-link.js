import { HT_EDIT_REQUEST } from 'Constants/commands';

export default {
  block_id: 'link:help:existing-link',
  type: 'context',
  elements: [
    {
      type: 'plain_text',
      text: ':x:  A headline request for that story already exists. Use the'
      + `"/${HT_EDIT_REQUEST}" command to edit an existing headline test.`,
    },
  ],
};
