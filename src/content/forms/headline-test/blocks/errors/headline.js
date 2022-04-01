export default ({ headline, link }) => ({
  block_id: 'errors:headline',
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*Request*\nLink: ${link}\nHeadline: ${headline}`,
  },
});
