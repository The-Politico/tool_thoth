import toEnglishNumber from 'Utils/toEnglishNumber';

export default (count) => ({
  block_id: 'update:dek:am',
  type: 'context',
  elements: [
    {
      type: 'mrkdwn',
      text: `Good morning! There are ${toEnglishNumber(count)} headline test `
      + 'request(s) scheduled for this morning and afternoon.',
    },
  ],
});
