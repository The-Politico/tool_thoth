export default (editing = false) => ({
  block_id: 'confirmation:one',
  type: 'context',
  elements: [
    {
      type: 'plain_text',
      text: editing
        ? 'Thank you for editing your headline test. The homepage team has '
          + 'been notified about your change and will reach out if they have '
          + 'any questions.'
        : 'Thank you for submiting a headline test. The homepage team has '
          + 'been notified about your request and will reach out if they have '
          + 'any questions.',
    },
  ],
});
