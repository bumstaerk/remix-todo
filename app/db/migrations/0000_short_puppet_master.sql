CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(256),
	"done" boolean DEFAULT false
);
