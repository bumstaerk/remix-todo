import { relations } from "drizzle-orm";
import { serial, varchar, pgTable, integer } from "drizzle-orm/pg-core";
import { tasks } from "./tasks";

export const states = pgTable("states", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 56 }),
  order: integer("order").default(0),
});

export const statesRelations = relations(states, ({ many }) => ({
  tasks: many(tasks),
}));
