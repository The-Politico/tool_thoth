export default (notes) => ({
  block_id: 'notes',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: '*Notes*',
    },
    {
      type: 'mrkdwn',
      text: notes,
    },
  ],
});
