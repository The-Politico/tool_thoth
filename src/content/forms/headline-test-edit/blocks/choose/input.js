export default (options) => ({
  block_id: 'choose:input',
  type: 'input',
  element: {
    type: 'static_select',
    placeholder: {
      type: 'plain_text',
      text: 'Select an item',
      emoji: true,
    },
    options: options
      .map((o) => ({
        text: {
          type: 'plain_text',
          text: o.label,
        },
        value: o.value,
      })),
  },
  label: {
    type: 'plain_text',
    text: 'Choose a request to edit',
  },
});
