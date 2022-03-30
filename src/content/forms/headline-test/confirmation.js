import blocks from './blocks';

const confirmation = function confirmation(self) {
  const {
    state,
  } = self;

  return {
    type: 'modal',
    title: state.useEditingMeta ? blocks.titles.edit : blocks.titles.create,
    blocks: [
      blocks.confirmation.one(state.useEditingMeta),
      blocks.confirmation.two,
      blocks.confirmation.three,
    ],
  };
};

export default confirmation;
