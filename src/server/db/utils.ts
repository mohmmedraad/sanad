import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `sanad_${name}`);

export const timestamps = {
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
};
