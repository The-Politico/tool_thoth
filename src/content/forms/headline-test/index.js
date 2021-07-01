import set from 'lodash/set';
import get from 'lodash/get';

import { HT_NEW_REQUEST as type } from 'Constants/callbacks';
import getLocalTimezone from 'Utils/getLocalTimezone';

import getView from './view';
import updateState from './updateState';
import parse from './parse';
import updateValues from './updateValues';
import validate from './validate';
import validateFutureDate from './validateFutureDate';
import isBeforeNextAlert from './isBeforeNextAlert';
import exportValues from './exportValues';
import importValues from './importValues';
import updateTimezone from './updateTimezone';

const htRequest = function htRequest(
  currentViewOrThothId = {},
) {
  const self = {};
  self.set = (path, value) => set(self, path, value);
  self.get = (path) => get(self, path);

  /* Set up properties */
  self.type = type;

  const localTz = getLocalTimezone(0, 'UTC');
  self.state = {
    verifiedCMSLink: null, // A link has been submitted and verified
    showScheduler: false, // The scheduler has been turned on
    verifiedDate: null, // A date has been submitted and verified
    asap: false, // The publish date is soon/asap
    formerlyAsap: false, // The publish date was soon/asap at some point
    headlineOptions: 0, // The amount of headline options being shown
    useValuesInView: false, // Use the values as defaults for the view
    useEditingMeta: false, // Use the "Editing" form title and submit
    tzOffset: localTz.offset, // The UTC offset of the timezone being used
    tzLabel: localTz.label, // A readable lable for the timezone
  };

  self.values = {};

  /* Set up methods */
  self.updateState = (newState) => updateState(self, newState);
  self.updateValues = (payload) => updateValues(self, payload);
  self.parse = (parseableObj) => parse(self, parseableObj);
  self.view = () => getView(self);
  self.validate = () => validate(self);
  self.import = () => importValues(self);
  self.export = () => exportValues(self);
  self.updateTimezone = async (user) => updateTimezone(self, user);
  self.isBeforeNextAlert = () => isBeforeNextAlert(self);
  self.validateFutureDate = (day, time) => validateFutureDate(
    self, day, time,
  );

  /* Initialitze instance */
  self.parse(currentViewOrThothId);

  return self;
};

export default htRequest;
