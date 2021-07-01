import set from 'lodash/set';
import get from 'lodash/get';

import { HT_EDIT_REQUEST as type } from 'Constants/callbacks';

import getView from './view';
import importValues from './importValues';

const htNotification = function htNotification({ id, values = {} } = {}) {
  const self = {};
  self.set = (path, value) => set(self, path, value);
  self.get = (path) => get(self, path);

  /* Set up properties */
  self.id = id;
  self.type = type;
  self.values = values;

  /* Set up methods */
  self.import = () => importValues(self);
  self.view = () => getView(self);

  return self;
};

export default htNotification;
