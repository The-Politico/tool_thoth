export default (timezone) => ({
  block_id: 'when:dek:bad',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: ':x:  Your publish date is set in the past. Please set a date '
      + 'and time at least five minutes in the future or click "Now" if it\'s '
      + 'already published. These times should be set in your local time '
      + `set in Slack (*${timezone}*).`,
    },
  ],
});
