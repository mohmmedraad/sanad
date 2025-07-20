import type { UserSession } from "@/features/auth/types";
import { getSession } from "@/lib/session";
import type { AuthenticatedPageProps } from "@/types";
import { redirect } from "next/navigation";

export default function RequireAuth<T>(
    Page: React.FC<AuthenticatedPageProps & T>,
    checkSession: (
        session: UserSession,
    ) => Promise<boolean> | boolean = async () => true,
) {
    async function AuthenticatedPage(props: AuthenticatedPageProps & T) {
        const session = await getSession();
        if (!session?.user) {
            return redirect("/login");
        }

        const check = await checkSession(session);

        if (!check) {
            return redirect("/login");
        }

        return <Page {...props} session={session} />;
    }
    return AuthenticatedPage;
}
