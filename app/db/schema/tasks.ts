import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { states } from "./states";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  stateId: integer("state_id").default(1),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  state: one(states, {
    fields: [tasks.stateId],
    references: [states.id],
  }),
}));
