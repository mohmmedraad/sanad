import type { getSession } from "@/lib/session";

export type UserSession = NonNullable<Awaited<ReturnType<typeof getSession>>>;
