import cron from 'node-cron';

import { deleteAllUsersLocations } from '~/models/userLocation';

export const scheduleDeletingUserTask = cron.schedule(
  '*/5 * * * *',
  async () => {
    console.log('deleting locations ...', new Date());

    await deleteAllUsersLocations();
  },
);
