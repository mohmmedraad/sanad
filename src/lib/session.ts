import "server-only";

import { auth } from "@/features/auth/config";
import type { UserSession } from "@/features/auth/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSession = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session;
});

export async function requireAuth(
    checkSession?: (session: UserSession) => Promise<boolean> | boolean,
): Promise<UserSession> {
    const session = await getSession();

    if (!session?.user) {
        redirect("/login");
    }

    if (checkSession) {
        const check = await checkSession(session);
        if (!check) {
            redirect("/login");
        }
    }

    return session;
}
