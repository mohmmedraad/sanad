import type { narratorGrades } from "@/constants";
import type { UserSession } from "@/features/auth/types";
import type { narratorsSchema } from "@/features/narrators/schemas";
import type { inferSchemaType } from "@/lib/utils";
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

type Narrator = inferSchemaType<typeof narratorsSchema>[number];
export type NarratorGrade = (typeof narratorGrades)[number];

export type WrokerEvent<T extends object> = {
    status: "done" | "no-change" | "field";

    data?: T;
    error?: unknown;
};

export type Layout = "both" | "draft" | "tree-editor";

export type NarratorsSyncWorkerReturn = WrokerEvent<{
    version: string;
    narrators: Narrator[];
}>;

export type Hadith = {
    hadith: string;
    rawi: string;
    mohdith: string;
    book: string;
    numberOrPage: string;
    grade: string;
};
