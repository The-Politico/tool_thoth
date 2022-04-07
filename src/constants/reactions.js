/**
 * This file is for setting up reaction parsers for updating statues.
 * Reaction added/removed handlers should be referenced in one of
 * `handlers/events/reactionAdded/index.js`
 * `handlers/events/reactionRemoved/index.js`
 */

/* Reactions indicating a test has started */
export const TEST_STARTED = [
  'sonic_running',
  'kirbyrun',
  'eyes',
  'eyeing-intensly-2',
];

/* Reactions indicating a test has been complete */
export const TEST_COMPLETE = [
  'white_check_mark',
  'heavy_check_mark',
  'ballot_box_with_check',
];
