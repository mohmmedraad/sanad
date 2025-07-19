import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `sanad_${name}`);

export const timestamps = {
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().$onUpdate(() => new Date()),
};
