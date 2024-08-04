import type db from '~/db';
import task_data from './data/tasks';
import { tasks } from '~/db/schema';

export default async function seed(db: db) {
  await Promise.all(
    task_data.map(async (task:any) => {
      await db.insert(tasks).values(task);
    }),
  );
}
