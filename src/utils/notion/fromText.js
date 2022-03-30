export default function fromText(node) {
  // eslint-disable-next-line no-param-reassign
  return node.reduce((acc, current) => acc + current.plain_text, '');
}
