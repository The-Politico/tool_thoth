import { apnumber } from 'journalize';

const headlineTestUpdate = function headlineTestUpdate({
  type,
  requests = [],
}) {
  const requestsCount = requests.length > 0 ? apnumber(requests.length) : 'no';
  const isAre = requests.length === 1 ? 'is' : 'are';
  const tests = requests.length === 1 ? 'test' : 'tests';

  if (type === 'am') {
    return '☀️ Good Morning! '
    + `There ${isAre} *${requestsCount}* headline ${tests} `
    + 'scheduled for this morning and afternoon.';
  }

  if (type === 'pm') {
    return '🌖 Good Evening! '
    + `There ${isAre} *${requestsCount}* headline ${tests} `
    + 'scheduled for tonight and early tomorrow morning.';
  }

  return '';
};

export default headlineTestUpdate;
