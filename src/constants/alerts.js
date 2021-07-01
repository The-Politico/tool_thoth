/* eslint-disable import/prefer-default-export */
/**
 * This file is for setting up automatic AWS Events alerts. The keys are the
 * time in UTC hours. The value is the "type" of alert, passed to the handler
 */

export const HEADLINE_TESTS = {
  10: 'am',
  22: 'pm',
};
