import get from 'lodash/get';
import toSlackTime from 'Utils/toSlackTime';
import toSlackDate from 'Utils/toSlackDate';
import getNextHour from 'Utils/getNextHour';

import { DEFAULT_SHOW_HEADLINES, MAX_HEADLINES } from './constants';
import blocks from './blocks';

const view = function view(self) {
  const {
    state,
    values,
    id,
    type,
  } = self;

  const {
    verifiedCMSLink,
    showScheduler,
    verifiedDate,
    asap,
    formerlyAsap,
    headlineOptions,
    useValuesInView,
    useEditingMeta,
    tzLabel,
  } = state;

  const output = [];

  const getInitialValue = (key) => (
    useValuesInView
      ? get(values, key)
      : undefined
  );

  output.push(blocks.link.input(getInitialValue('link')));

  if (verifiedCMSLink === false) {
    output.push(blocks.link.help.badLink);
  }

  if (showScheduler) {
    output.push(blocks.when.header);

    if (verifiedDate === false) {
      output.push(blocks.when.dek.bad(tzLabel));
    } else if (asap) {
      output.push(blocks.when.dek.clicked(tzLabel));
    } else {
      output.push(blocks.when.dek.initial(tzLabel));
    }

    if (!asap) {
      let initialDate;
      let initialTime;

      if (useValuesInView) {
        initialDate = values.publishDate;
        initialTime = values.publishTime;
      } else if (formerlyAsap) {
        const nextHour = getNextHour();

        initialDate = toSlackDate(nextHour);
        initialTime = toSlackTime(nextHour);
      }

      output.push(blocks.when.inputs(initialDate, initialTime));
    } else {
      output.push(blocks.when.edit);
    }
  }

  if (verifiedDate || headlineOptions > 0) {
    output.push(blocks.headlines.header);
    output.push(blocks.headlines.dek);

    if (headlineOptions > 0) {
      (new Array(headlineOptions)).fill(undefined).forEach((_, idx) => {
        output.push(blocks.headlines.input(
          idx, getInitialValue(`headlines[${idx}]`),
        ));
      });
    } else {
      (new Array(DEFAULT_SHOW_HEADLINES)).fill(undefined).forEach((_, idx) => {
        output.push(blocks.headlines.input(
          idx, getInitialValue(`headlines[${idx}]`),
        ));
      });
    }

    if (headlineOptions < MAX_HEADLINES) {
      output.push(blocks.headlines.add);
    }

    output.push(blocks.notes.input(getInitialValue('notes'), useEditingMeta));
  }

  if (id) {
    output.push(blocks.meta.id(id));
  }

  return {
    type: 'modal',
    title: useEditingMeta ? blocks.titles.edit : blocks.titles.create,
    submit: useEditingMeta ? blocks.submits.edit : blocks.submits.request,
    blocks: output,
    callback_id: type,
  };
};

export default view;
