export default (errors) => ({
  block_id: 'errors:list',
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: Object
      .keys(errors)
      .map(
        (sectionName) => `*${sectionName}*\n${errors[sectionName].join('')}`,
      ).join('\n\n'),
  },
});
