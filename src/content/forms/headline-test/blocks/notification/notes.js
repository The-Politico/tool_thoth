export default (text) => ({
  block_id: 'notification:notes',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: '*Notes*',
    },
    {
      type: 'mrkdwn',
      text,
    },
  ],
});
