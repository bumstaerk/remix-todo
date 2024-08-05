CREATE TABLE IF NOT EXISTS "states" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(56),
	"order" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "state_id" SET DEFAULT 0;