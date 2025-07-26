import { LogoIcon } from "@/components/icons";
import LoginCard from "@/features/auth/components/login-card";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex items-center justify-center rounded-md text-primary-foreground">
                        <LogoIcon className="size-6" />
                    </div>
                    سند
                </a>
                <Suspense>
                    <LoginCard />
                </Suspense>
            </div>
        </div>
    );
}
