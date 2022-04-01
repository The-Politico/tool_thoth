const fs = require('fs-extra');
const path = require('path');
const dotenv = require('dotenv');

const installDependencies = require('./dependencies');
const zipBundle = require('./archive');

const log = {
  // eslint-disable-next-line no-console
  info: (...msg) => console.log(
    '\x1b[36m%s\x1b[0m', 'info', ' - ', ...msg,
  ),
  // eslint-disable-next-line no-console
  success: (...msg) => console.log(
    '\x1b[32m%s\x1b[0m', 'success', ' - ', ...msg,
  ),
};

const ROOT = path.join(__dirname, '..');
const OUTPUT_DIRECTORY = path.join(ROOT, 'dist');

const bundle = async function bundle() {
  log.info('Deleting previous bundle...');
  await Promise.all(
    [
      'package.json',
    ].map((dir) => fs.remove(path.join(
      OUTPUT_DIRECTORY,
      dir,
    ))),
  );

  log.info('Adding scripts to new bundle...');
  await fs.ensureDir(OUTPUT_DIRECTORY);

  await Promise.all(
    [
      'package.json',
    ].map((dir) => fs.copy(
      path.join(ROOT, dir),
      path.join(OUTPUT_DIRECTORY, dir),
    )),
  );

  log.info('Installing dependencies...');
  await installDependencies(OUTPUT_DIRECTORY);

  log.info('Zipping bundle...');
  await zipBundle();

  log.success(
    'Bundle saved to "upload.zip". Run "yarn ship" to upload to AWS.',
  );
};

module.exports = bundle;

if (require.main === module) {
  dotenv.config();
  bundle();
}
