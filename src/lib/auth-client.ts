import { env } from "@/env";
import { oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            autoSelect: true,
            cancelOnTapOutside: true,
            context: "use",
            promptOptions: {
                baseDelay: 1000,
                maxAttempts: 5,
            },
        }),
    ],
});
