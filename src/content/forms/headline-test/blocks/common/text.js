export default (text) => ({
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text,
    },
  ],
});
