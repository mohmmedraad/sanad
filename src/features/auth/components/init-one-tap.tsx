"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function InitOneTap() {
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        console.log(session?.user);
        if (isPending || session?.user) return; // Don't show one-tap if already logged in

        (async () => {
            try {
                await authClient.oneTap();
            } catch (error) {
                console.error("One-tap initialization failed:", error);
            }
        })();
    }, [session, isPending]);

    return null;
}
