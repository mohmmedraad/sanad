import type { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
    out: "./src/server/db/migrations",
    schema: "./src/server/db/schema",
    casing: "snake_case",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    tablesFilter: ["sanad_*"],
} satisfies Config;
