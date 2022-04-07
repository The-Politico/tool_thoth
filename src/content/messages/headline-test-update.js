import { apnumber } from 'journalize';

const headlineTestUpdate = function headlineTestUpdate({
  requests = [],
}) {
  const requestsCount = requests.length > 0 ? apnumber(requests.length) : 'no';
  const isAre = requests.length === 1 ? 'is' : 'are';
  const tests = requests.length === 1 ? 'test' : 'tests';

  return `👋 Hello! There ${isAre} *${requestsCount}* headline ${tests} `
  + 'scheduled for the next five minutes.';
};

export default headlineTestUpdate;
