import get from 'lodash/get';

export default function getProperty(
  row, propName, typeName, defaultValue = undefined,
) {
  return get(row, `properties.${propName}.${typeName}`, defaultValue);
}
