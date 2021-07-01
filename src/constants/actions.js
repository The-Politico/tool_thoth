/**
 * This file is for setting up unique IDs for all of this app's interactions
 * The ID should be used as the action_id in an interactive block in `content`
 * and referenced in a handler in
 * `handlers/interactivity/blockActions/<input-type>/<your-handler>/index.js`
 */

/* Button Clicks */
export const HT_NOW_ASAP_CLICK = 'headline-test:now-asap-click';
export const HT_EDIT_TIME_CLICK = 'headline-test:edit-time-click';
export const HT_ADD_HEADLINE_CLICK = 'headline-test:add-headline-click';
export const HT_SEE_REQUESTS_CLICK = 'headline-test:see-requests-click';
export const HT_SEE_STORY_CLICK = 'headline-test:see-story-click';

/* Picker Inputs */
export const HT_SCHEDULED_DATE_UPDATE = 'headline-test:scheduled-date-update';
export const HT_SCHEDULED_TIME_UPDATE = 'headline-test:scheduled-time-update';

/* Plain Text Inputs */
export const HT_CMS_LINK_UPDATE = 'headline-test:cms-link-update';
export const HT_NOTES_UPDATE = 'headline-test:notes-update';
export const HT_HEADLINE_LINK_UPDATE = [
  'headline-test:headline-one-update',
  'headline-test:headline-two-update',
  'headline-test:headline-three-update',
  'headline-test:headline-four-update',
  'headline-test:headline-five-update',
  'headline-test:headline-six-update',
  'headline-test:headline-seven-update',
  'headline-test:headline-eight-update',
  'headline-test:headline-nine-update',
  'headline-test:headline-ten-update',
];
