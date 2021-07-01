import getValue from 'Utils/getValueFromSlackPayload';

const updateValues = function updateValues(self, payload) {
  const { view } = payload;
  const { values } = view.state;

  const request = getValue(values, 'choose:input');

  self.set('values', {
    request,
  });
};

export default updateValues;
