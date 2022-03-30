/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const archiver = require('archiver');
const fs = require('fs-extra');

const ROOT = path.join(__dirname, '..');
const BUNDLE_DIRECTORY = path.join(ROOT, 'dist');
const ARCHIVE_DESTINATION = path.join(ROOT, 'terraform', 'upload.zip');

const zip = archiver('zip');

const archiveBundle = function archiveBundle() {
  const output = fs.createWriteStream(ARCHIVE_DESTINATION);

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      resolve();
    });

    zip.on('error', (err) => {
      reject(err);
    });

    zip.pipe(output);

    zip.directory(BUNDLE_DIRECTORY, false);

    zip.finalize();
  });
};

if (require.main === module) {
  archiveBundle();
}

module.exports = archiveBundle;
