const getValueFromSlackPayload = function getValue(payload, key, subkey) {
  const blockData = payload[key];

  if (!blockData) {
    return undefined;
  }

  let valueObj = {};
  if (subkey) {
    valueObj = blockData[subkey];
  } else {
    const firstKey = Object.keys(blockData)[0];
    valueObj = blockData[firstKey];
  }

  if (Object.hasOwnProperty.call(valueObj, 'selected_date')) {
    return valueObj.selected_date;
  }

  if (Object.hasOwnProperty.call(valueObj, 'selected_time')) {
    return valueObj.selected_time;
  }

  if (Object.hasOwnProperty.call(valueObj, 'value')) {
    return valueObj.value;
  }

  if (Object.hasOwnProperty.call(valueObj, 'selected_option')) {
    if (valueObj.selected_option) {
      return valueObj.selected_option.value;
    }
  }

  return undefined;
};

export default getValueFromSlackPayload;
