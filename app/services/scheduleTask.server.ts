import cron from 'node-cron';

import { deleteAllUsersLocations } from '~/repository/userLocation.server';

export const scheduleCleaningLocationTask = cron.schedule(
  '*/5 * * * *',
  async () => {
    console.log('starting schedule task...');
    await deleteAllUsersLocations();
  },
  { runOnInit: true },
);

scheduleCleaningLocationTask.start();
