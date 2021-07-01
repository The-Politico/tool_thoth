export default ({ time }) => ({
  block_id: `update:subheader:${time}`,
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `*${time}*`,
    },
  ],
});
