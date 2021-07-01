import { HEADLINE_TESTS_SHEET } from 'Constants/locations';
import { HT_SEE_REQUESTS_CLICK, HT_SEE_STORY_CLICK } from 'Constants/actions';

export default (link) => ({
  block_id: 'links',
  type: 'actions',
  elements: [
    {
      type: 'button',
      action_id: HT_SEE_STORY_CLICK,
      value: HT_SEE_STORY_CLICK,
      url: link,
      text: {
        type: 'plain_text',
        text: 'See Story in CMS',
      },
    },
    {
      type: 'button',
      action_id: HT_SEE_REQUESTS_CLICK,
      value: HT_SEE_REQUESTS_CLICK,
      url: `https://docs.google.com/spreadsheets/d/${HEADLINE_TESTS_SHEET()}/edit`,
      text: {
        type: 'plain_text',
        text: 'See All Requests',
      },
    },
  ],
});
