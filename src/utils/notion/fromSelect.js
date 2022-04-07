export default function fromSelect(node) {
  if (!node || !node.select) {
    return undefined;
  }

  return node.select.name;
}
