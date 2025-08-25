"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type LogoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    redirect?: string;
};
export default function LogoutButton({
    children,
    redirect,
    ...props
}: LogoutButtonProps) {
    const router = useRouter();
    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    if (redirect) {
                        router.push(redirect);
                    }
                },
            },
        });
    }
    return (
        <button onClick={handleLogout} {...props}>
            {children}
        </button>
    );
}
