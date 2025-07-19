import { boolean, json, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable, timestamps } from "../utils";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const treesTable = createTable("tree", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar().notNull(),
    draft: json().notNull().default([]),
    nodes: json().notNull().default([]),
    edges: json().notNull().default([]),
    userId: text().notNull().references(() => usersTable.id, {
      onDelete: "cascade"
    }),
    showMiniMap: boolean().default(true),
    ...timestamps,
});

export const treeRelations = relations(treesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [treesTable.userId],
    references: [usersTable.id],
  }),
}));
