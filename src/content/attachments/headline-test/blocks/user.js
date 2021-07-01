export default (user) => ({
  block_id: 'user',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `*Last Edited By:* ${user}`,
    },
  ],
});
