import { HEADLINE_TEST_GUIDE } from 'Constants/locations';

export default () => ({
  block_id: 'headlines:dek',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: 'Please provide your original headline along with at least '
      + 'one alternative you want to test. If you need help coming up with '
      + 'new headline ideas, check out our '
      + `<https://docs.google.com/document/d/${HEADLINE_TEST_GUIDE()}|`
      + 'Best Practices Guide>.',
    },
  ],
});
