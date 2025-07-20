import type { db } from "@/server/db";
import type { tree } from "@/server/db/schema/tree";

export type Tree = typeof tree.$inferSelect;

export type DB = typeof db;
