import loadEnvFromAWS from 'Utils/loadEnvFromAWS';
import dotenv from 'dotenv';

export default async () => {
  if (!process.env.AWS) {
    dotenv.config();
  }

  await loadEnvFromAWS([
    'GOOGLE_SERVICE_ACCOUNT_KEY',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'THOTH_API_TOKEN',
    'THOTH_SLACK_SECRET',
    'THOTH_SLACK_TOKEN',
  ]);
};
