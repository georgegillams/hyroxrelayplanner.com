/* eslint-disable no-console */
const { execSync } = require('child_process');

const prompt = require('prompt');

// Create backup
const defaultBackupName = Date.now().toString();
const cliApiKey = process.argv[process.argv.indexOf('--apiKey') + 1];
const schema = {
  properties: {
    backupName: {
      description: 'What shall we call this backup?',
      default: defaultBackupName,
      pattern: /.*/,
      message: '',
    },
    apiKey: {
      description: 'Enter the admin API key to use for this backup',
      default: cliApiKey,
      pattern: /.*/,
      message: 'Enter the admin API key to use for this backup',
      required: true,
      hidden: true,
    },
  },
};

const performBackup = async (err, { backupName, apiKey }) => {
  if (err) {
    console.error(err);
    return;
  }

  execSync(`mkdir ~/Dropbox/hyroxrelayplanner.com/backups/${backupName}`);

  execSync(
    `wget https://www.hyroxrelayplanner.com/api/data-management/backup --header "apiKey: ${apiKey}" -O ~/Dropbox/hyroxrelayplanner.com/backups/${backupName}/data.json`
  );
};

prompt.start();
prompt.get(schema, performBackup);
