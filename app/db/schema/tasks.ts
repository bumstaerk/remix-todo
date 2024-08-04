import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    text: varchar("text", { length: 256 }),
    done: boolean("done").default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
})