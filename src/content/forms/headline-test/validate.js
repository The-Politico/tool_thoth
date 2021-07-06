import database from 'Databases/headline-test/index';
import { HT_EDIT_REQUEST } from 'Constants/commands';
import blocks from './blocks';
import { MIN_HEADLINES } from './constants';
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
    appendOrCreate(
      'CMS Link',
      '– It doesn\'t look like this is a valid CMS link. Links to '
      + 'the CMS should start with "https://cms.politico.com/cms/..."',
    );
  }

  const existingRow = await database.getRequestByLink(values.link);
  if (existingRow && existingRow.id !== id) {
    formValid = false;
    appendOrCreate(
      'CMS Link',
      '– A headline request for that story already exists. Use the'
      + `"/${HT_EDIT_REQUEST}" command to edit an existing headline test.`,
    );
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

  if (values.headlines.filter((h) => !!h).length < MIN_HEADLINES) {
    formValid = false;
    appendOrCreate(
      'Headlines',
      `– Please provide at least ${MIN_HEADLINES} headline choices.`,
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
