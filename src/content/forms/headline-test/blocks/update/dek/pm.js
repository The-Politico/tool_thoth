import toEnglishNumber from 'Utils/toEnglishNumber';

export default (count) => ({
  block_id: 'update:dek:pm',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `Good afternoon! There are ${toEnglishNumber(count)} headline test `
      + 'request(s) scheduled for tonight.',
    },
  ],
});
