export default (headlines) => {
  const headlinesString = headlines.map((h) => (`– ${h}`)).join('\n');

  return {
    block_id: 'headline',
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Headlines*\n${headlinesString}`,
    },
  };
};
