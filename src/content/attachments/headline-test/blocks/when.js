export default (day, time) => ({
  block_id: 'when',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `*Scheduled For:* ${day} at ${time}`,
    },
  ],
});
