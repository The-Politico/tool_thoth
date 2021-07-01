export default (headlines) => ({
  block_id: 'alt-headlines',
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*Alternative Headlines*\n${headlines.map((h) => (`– ${h}`)).join('\n')}`,
  },

});
