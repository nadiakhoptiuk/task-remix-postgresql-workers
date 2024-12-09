import cron from 'node-cron';

import { deleteAllUsersLocations } from '~/models/userLocation';

export const scheduleDeletingUserTask = cron.schedule(
  '*/5 * * * *',
  async () => {
    await deleteAllUsersLocations();
  },
  { runOnInit: true },
);
