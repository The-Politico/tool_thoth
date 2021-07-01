export default ({ day, time }) => ({
  block_id: 'notification:time',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `*Scheduled For:* ${day} at ${time}`,
    },
  ],
});
