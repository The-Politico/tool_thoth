import gootenberg from 'Utils/gootenberg';
import { HEADLINE_TEST_ANALYTICS } from 'Constants/locations';
import { log } from './console';

const now = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const day = nowDate.getDate();
  const month = nowDate.getMonth() + 1;
  const hour = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  if (`${minutes}`.length === 1) {
    minutes = `0${minutes}`;
  }

  return `${month}/${day}/${year} ${hour}:${minutes}`;
};

export default async ({ user, handler, subhandler }) => {
  try {
    await gootenberg.sheets.appendRows(
      HEADLINE_TEST_ANALYTICS(),
      [[now(), user, handler, subhandler]],
    );
  } catch (e) {
    log('An error occured while trying to report usage.', 'error');
    log(e, 'error');
  }
};
