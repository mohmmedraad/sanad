import type { Edge, Node } from "@/features/trees/types/tree-editor";
import type { Value } from "@udecode/plate";
import { relations } from "drizzle-orm";
import { boolean, json, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createTable, timestamps } from "../utils";
import { user } from "./user";

export const tree = createTable("tree", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar().notNull(),
    draft: json().$type<Value>().notNull().default([]),
    nodes: json().$type<Node[]>().notNull().default([]),
    edges: json().$type<Edge[]>().notNull().default([]),
    userId: text()
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    showMiniMap: boolean().notNull().default(true),
    ...timestamps,
});

export const treeRelations = relations(tree, ({ one }) => ({
    user: one(user, {
        fields: [tree.userId],
        references: [user.id],
    }),
}));
