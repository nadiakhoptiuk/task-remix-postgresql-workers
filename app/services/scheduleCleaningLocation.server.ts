import cron from 'node-cron';

import { deleteAllUsersLocations } from '~/models/userLocation';

export const scheduleCleaningLocationTask = cron.schedule(
  '*/5 * * * *',
  async () => {
    await deleteAllUsersLocations();
  },
  { runOnInit: true },
);
