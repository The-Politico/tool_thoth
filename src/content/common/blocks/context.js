import textElement from 'Content/common/elements/text';

export default (text) => ({
  type: 'context',
  elements: [
    textElement(text),
  ],
});
