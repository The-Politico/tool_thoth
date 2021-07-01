export default (id) => ({
  block_id: 'meta:id',
  type: 'context',
  elements: [
    {
      type: 'plain_text',
      text: `ID: ${id}`,
    },
  ],
});
