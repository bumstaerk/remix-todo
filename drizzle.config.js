import env from "~/env"

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./app/db/schema/index.ts",
    out: "./app/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL
    },
    verbose: true,
    strict: true,
})