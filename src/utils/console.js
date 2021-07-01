/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console  */

const LOG_FUNCTIONS = {
  error: console.error,
  warning: console.warning,
  default: console.log,
};

export const log = function log(message, type) {
  if (process.env.VERBOSE_MODE === false) {
    return;
  }

  const logFunc = LOG_FUNCTIONS[type] || LOG_FUNCTIONS.default;

  logFunc(message);
};
