import "server-only";

import { auth } from "@/features/auth/config";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session;
});
