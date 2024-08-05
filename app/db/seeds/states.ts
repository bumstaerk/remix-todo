import type db from "~/db";
import states_data from "./data/states";
import { states } from "~/db/schema";

export default async function seed(db: db) {
  await Promise.all(
    states_data.map(async (state: any) => {
      await db.insert(states).values(state);
    })
  );
}
