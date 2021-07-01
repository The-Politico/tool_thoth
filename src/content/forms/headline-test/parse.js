import blocks from './blocks';

const genHasBlock = (viewBlocks) => (key) => viewBlocks.some(
  (b) => b.block_id === key,
);

const parse = function parse(self, currentViewOrThothId) {
  if (typeof currentViewOrThothId === 'string') {
    self.set('id', currentViewOrThothId);
    return self;
  }

  const currentView = currentViewOrThothId;
  const opts = {};

  if (!currentView || !currentView.blocks) {
    return self;
  }

  const hasBlock = genHasBlock(currentView.blocks);

  if (currentView.title.text === blocks.titles.edit.text) {
    opts.useEditingMeta = true;
  }

  if (hasBlock('link:help:bad-link')) {
    opts.verifiedCMSLink = false;
  }

  if (hasBlock('when:header')) {
    opts.showScheduler = true;
  }

  if (hasBlock('when:dek:bad')) {
    opts.verifiedDate = false;
  }

  if (hasBlock('when:edit')) {
    opts.asap = true;
  }

  if (hasBlock('when:datepicker:now')) {
    opts.formerlyAsap = true;
  }

  if (hasBlock('headlines:header')) {
    opts.verifiedDate = true;
  }

  if (hasBlock('headlines:input:ten')) {
    opts.headlineOptions = 10;
  } else if (hasBlock('headlines:input:nine')) {
    opts.headlineOptions = 9;
  } else if (hasBlock('headlines:input:eight')) {
    opts.headlineOptions = 8;
  } else if (hasBlock('headlines:input:seven')) {
    opts.headlineOptions = 7;
  } else if (hasBlock('headlines:input:six')) {
    opts.headlineOptions = 6;
  } else if (hasBlock('headlines:input:five')) {
    opts.headlineOptions = 5;
  } else if (hasBlock('headlines:input:four')) {
    opts.headlineOptions = 4;
  } else if (hasBlock('headlines:input:three')) {
    opts.headlineOptions = 3;
  } else if (hasBlock('headlines:input:two')) {
    opts.headlineOptions = 2;
  } else if (hasBlock('headlines:input:one')) {
    opts.headlineOptions = 1;
  }

  self.updateState(opts);

  const id = hasBlock('meta:id')
    ? currentView.blocks.find(
      (b) => b.block_id === 'meta:id',
    ).elements[0].text.split('ID: ')[1]
    : currentView.id;
  self.set('id', id);

  return self;
};

export default parse;
