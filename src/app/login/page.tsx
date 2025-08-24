"use client";

import { LogoIcon } from "@/components/icons";
import LoginButton from "@/components/login-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type LoginCardProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};

export default async function LoginCard({ searchParams }: LoginCardProps) {
    const { error } = await searchParams;

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
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">مرحباً بعودتك</CardTitle>
                        <CardDescription>
                            سجل الدخول باستخدام حساب Google الخاص بك{" "}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginButton variant="outline" className="w-full" />
                    </CardContent>
                    {!!error && (
                        <CardFooter className="mx-auto text-center text-destructive">
                            حدثت مشكلة أثناء تسجيل الدخول
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}
