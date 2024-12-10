import cron from 'node-cron';

import { deleteAllUsersLocations } from '~/repository/userLocation.server';

export const scheduleCleaningLocationTask = cron.schedule(
  '*/5 * * * *',
  async () => {
    await deleteAllUsersLocations();
  },
  { runOnInit: true },
);
