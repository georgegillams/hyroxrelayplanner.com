/* eslint-disable no-console */
const { execSync } = require('child_process');

const prompt = require('prompt');

// Create backup
const defaultBackupName = Date.now().toString();
const cliApiKey = process.argv[process.argv.indexOf('--apiKey') + 1];
const cliBackupLocation = process.argv[process.argv.indexOf('--backupsLocation') + 1];
const schema = {
  properties: {
    backupsLocation: {
      description: 'Where should we store backups?',
      default: cliBackupLocation,
      pattern: /.*/,
      message: 'Where should we store backups?',
      required: true,
    },
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

const performBackup = async (err, { backupsLocation, backupName, apiKey }) => {
  if (err) {
    console.error(err);
    return;
  }

  execSync(`mkdir "${backupsLocation}/${backupName}"`);

  execSync(
    `wget https://www.hyroxrelayplanner.com/api/data-management/backup --header "apiKey: ${apiKey}" -O "${backupsLocation}/${backupName}/data.json"`
  );
};

prompt.start();
prompt.get(schema, performBackup);
