export default (text) => ({
  block_id: 'notification:headline',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `*${text}*`,
    },
  ],
});
