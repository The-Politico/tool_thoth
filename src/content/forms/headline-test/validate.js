import database from 'Databases/headline-test/index';
import blocks from './blocks';
import { DEFAULT_SHOW_HEADLINES } from './constants';
import validateFutureDate from './validateFutureDate';

const validate = async function validate(self) {
  const {
    values,
    state,
    id,
  } = self;

  let formValid = true;
  const errors = {};

  const appendOrCreate = (key, value) => {
    if (!errors[key]) {
      errors[key] = [];
    }

    errors[key].push(value);
  };

  if (values.link.match(/https:\/\/cms.politico.com\/cms\/.*/) === null) {
    formValid = false;
    appendOrCreate('CMS Link', '– This link is invalid.');
  }

  const existingRow = await database.getRequestByLink(values.link);
  if (existingRow && existingRow.id !== id) {
    formValid = false;
    appendOrCreate('CMS Link', '– A request for this link already exists.');
  }

  if (values.publishDate && values.publishTime) {
    const validDate = validateFutureDate(
      self, values.publishDate, values.publishTime,
    );
    if (!validDate) {
      formValid = false;
      appendOrCreate(
        'Publish Time',
        '– Publish times should be at least an hour in '
          + 'the future. If the story is already published, click "Now".',
      );
    }
  }

  if (values.headlines.filter((h) => !!h).length < DEFAULT_SHOW_HEADLINES) {
    formValid = false;
    appendOrCreate(
      'Headlines',
      `– Please provide at least ${DEFAULT_SHOW_HEADLINES} headline choices.`,
    );
  }

  const dialogView = formValid
    ? {
      type: 'modal',
      title: state.useEditingMeta ? blocks.titles.edit : blocks.titles.create,
      blocks: [
        blocks.confirmation.one(state.useEditingMeta),
        blocks.confirmation.two,
        blocks.confirmation.three,
      ],
    }
    : {
      type: 'modal',
      title: blocks.titles.error,
      blocks: [
        blocks.errors.list(errors),
        blocks.errors.disclaimer,
      ],
    };

  return [formValid, dialogView];
};

export default validate;
