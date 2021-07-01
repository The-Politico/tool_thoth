export default (items) => ({
  block_id: 'update:items:',
  type: 'context',
  elements: items.map(({ time, text }) => ({
    type: 'mrkdwn',
    text: `– (${time}) ${text}`,
  })),
});
