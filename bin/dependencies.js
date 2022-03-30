const { spawn } = require('child_process');

const installDependencies = function installDependencies(cwd) {
  if (!cwd || typeof cwd !== 'string') {
    throw new Error('No or invalid CWD provided.');
  }

  const process = spawn(
    'npm',
    ['install', '--production'],
    { cwd },
  );

  /* eslint-disable-next-line no-console */
  process.stdout.on('data', (msg) => { console.log(`${msg}`); });

  /* eslint-disable-next-line no-console */
  process.stderr.on('data', (msg) => { console.log(`${msg}`); });

  return new Promise((resolve, reject) => {
    process.on('exit', (code) => {
      if (code === 1) {
        reject(code);
      }

      resolve(code);
    });
  });
};

if (require.main === module) {
  installDependencies({ cwd: process.cwd() });
}

module.exports = installDependencies;
