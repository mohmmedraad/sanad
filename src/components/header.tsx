"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoIcon } from "./icons";
import { ModeToggleButton } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import { UserNav, UserNavSkeleton } from "./user-nav";

export default function Header() {
    const { data: session, isPending } = authClient.useSession();

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
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "sm",
                                }),
                                "rounded-full",
                            )}
                        >
                            تسجيل الدخول
                        </Link>
                    )}
                    <ModeToggleButton className="size-8 rounded-full" />
                </div>
            </div>
        </header>
    );
}
