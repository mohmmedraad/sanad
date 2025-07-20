import type { UserSession } from "@/features/auth/types";
import type { db } from "@/server/db";
import type { tree } from "@/server/db/schema/tree";
import type { SearchParams } from "next/dist/server/request/search-params";

export type Tree = typeof tree.$inferSelect;

export type DB = typeof db;

export type PageProps = {
    searchParams: SearchParams;
};

export type AuthenticatedPageProps = PageProps & {
    session: UserSession;
};

export type User = UserSession["user"];
