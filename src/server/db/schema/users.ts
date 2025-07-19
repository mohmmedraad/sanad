import { relations } from "drizzle-orm";
import { boolean, text, timestamp, unique, varchar } from "drizzle-orm/pg-core";
import { createTable, timestamps } from "../utils";
import { treesTable } from "./trees";

export const usersTable = createTable(
    "user",
    {
        id: varchar().primaryKey(),
        name: varchar("name").notNull(),
        email: varchar("email").notNull(),
        image: varchar("image"),
        emailVerified: boolean("email_verified").default(false),
        ...timestamps,
    },
    (table) => ({
        emailIdx: unique().on(table.email),
    }),
);

export const accountsTable = createTable("account", {
    id: varchar().primaryKey(),
    scope: varchar(),
    userId: text()
        .notNull()
        .references(() => usersTable.id, {
            onDelete: "cascade",
        }),
    idToken: varchar(),
    password: varchar(),
    accountId: varchar().notNull(),
    providerId: varchar().notNull(),
    accessToken: varchar(),
    refreshToken: varchar(),
    accessTokenExpiresAt: timestamp({
        withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp({
        withTimezone: true,
    }),
    ...timestamps,
});

export const sessionsTable = createTable(
    "session",
    {
        id: varchar().primaryKey(),
        token: varchar().notNull(),
        userId: text()
            .notNull()
            .references(() => usersTable.id, {
                onDelete: "cascade",
            }),
        ipAddress: varchar(),
        userAgent: varchar(),
        expiresAt: timestamp().notNull(),
        ...timestamps,
    },
    (table) => ({
        tokenUnique: unique().on(table.token),
    }),
);

export const verificationsTable = createTable("verification", {
    id: varchar().primaryKey(),
    value: varchar().notNull(),
    identifier: varchar().notNull(),
    expiresAt: timestamp().notNull(),
    ...timestamps,
});

export const userRelations = relations(usersTable, ({ many }) => ({
    accounts: many(accountsTable),
    sessions: many(sessionsTable),
    trees: many(treesTable),
}));

export const accountRelations = relations(accountsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [accountsTable.userId],
        references: [usersTable.id],
    }),
}));

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.userId],
        references: [usersTable.id],
    }),
}));
