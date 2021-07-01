/**
 * This file is for setting location values for external resources like Google
 * docs and Slach channels. They might be functions if they're accessing
 * the environment as env loading can be asycronous in certain contexts.
 */

export const HEADLINE_TEST_CHANNEL = () => (
  process.env.SLACK_HEADLINE_TEST_CHANNEL
);

export const HEADLINE_TESTS_SHEET = () => process.env.GOOGLE_HEADLINE_TESTS;
