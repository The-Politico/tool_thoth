export default (timezone) => ({
  block_id: 'when:dek:initial',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: 'If the story is set to publish in the next half hour click '
      + '"Now." Otherwise, choose a time and date. These times should '
      + `be set in your local time set in Slack (*${timezone}*).`,
    },
  ],
});
