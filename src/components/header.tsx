"use client";

import { env } from "@/env";
import { authClient } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { LogoIcon } from "./icons";
import { ModeToggleButton } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserNav, UserNavSkeleton } from "./user-nav";

export default function Header() {
    const { data: session, isPending } = authClient.useSession();

    const { mutate: handleLogin, isPending: isLoginPending } = useMutation({
        mutationFn: async () => {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${env.NEXT_PUBLIC_WEBSITE_URL}/profile/trees`,
                errorCallbackURL: `${env.NEXT_PUBLIC_WEBSITE_URL}/login`,
            });

            if (error) {
                throw error;
            }
        },
        onError: () => {
            toast.error("حدثت خطأ أثناء تسجيل الدخول");
        },
    });

    return (
        <header className="sticky top-4 left-0 z-50 w-full px-4 sm:px-6 lg:px-8">
            <div className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-[2rem] border border-gray-200 bg-white px-4 py-2.5 md:mx-auto dark:border-neutral-700 dark:bg-neutral-900">
                <Link
                    className="inline-block flex-none rounded-md text-xl focus:opacity-80 focus:outline-none"
                    href="/"
                    aria-label="سند"
                >
                    <LogoIcon className="size-8" />
                </Link>
                <div className="flex items-center gap-2">
                    {isPending && <UserNavSkeleton />}
                    {!isPending && session?.user ? (
                        <UserNav user={session.user} />
                    ) : null}

                    {!isPending && !session?.user && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => handleLogin()}
                            disabled={isLoginPending}
                        >
                            تسجيل الدخول باستخدام
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Button>
                    )}
                    <ModeToggleButton className="size-8 rounded-full" />
                </div>
            </div>
        </header>
    );
}
