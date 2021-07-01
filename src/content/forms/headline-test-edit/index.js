import set from 'lodash/set';
import get from 'lodash/get';

import { HT_EDIT_REQUEST as type } from 'Constants/callbacks';

import getView from './view';
import updateValues from './updateValues';

const htEdit = function htEdit() {
  const self = {};
  self.set = (path, value) => set(self, path, value);
  self.get = (path) => get(self, path);

  /* Set up properties */
  self.type = type;

  self.values = {};

  /* Set up methods */
  self.updateValues = (payload) => updateValues(self, payload);
  self.view = () => getView(self);

  return self;
};

export default htEdit;
