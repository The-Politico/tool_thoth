/**
 * This file is for setting up unique IDs for various commands.
 * Slash commands should be set up in your Slack app and referenced in
 * `handlers/slash/<your-handler>/index.js`
 * Bridge commands should be set up in your terraform files and referenced in
 * `handlers/bridge/<your-handler>/index.js`
 */

/* Slack Slash Commands */
export const HT_NEW_REQUEST = 'headline-test-new';
export const HT_EDIT_REQUEST = 'headline-test-edit';
export const HT_LIST_REQUEST = 'headline-test-all';

/* Bridge Commands */
export const HT_UPDATE = 'headline-test-update';
