import getValue from 'Utils/getValueFromSlackPayload';
import toEnglishNumber from 'Utils/toEnglishNumber';

import {
  HT_SCHEDULED_DATE_UPDATE,
  HT_SCHEDULED_TIME_UPDATE,
} from 'Constants/actions';
import { MAX_HEADLINES } from './constants';

const updateValues = function updateValues(self, payload) {
  const { view } = payload;
  const { values } = view.state;

  const link = getValue(values, 'link:input');

  const publishDate = getValue(
    values, 'when:inputs', HT_SCHEDULED_DATE_UPDATE,
  );

  const publishTime = getValue(
    values, 'when:inputs', HT_SCHEDULED_TIME_UPDATE,
  );

  const notes = getValue(values, 'notes:input');

  const iterator = (new Array(MAX_HEADLINES)).fill(undefined);
  const headlines = iterator
    .map((_, idx) => getValue(
      values, `headlines:input:${toEnglishNumber(idx + 1)}`,
    ));

  self.set('values', {
    user: payload.user.id,
    link,
    publishDate,
    publishTime,
    notes,
    headlines,
  });

  return self;
};

export default updateValues;
