import RequireAuth from "@/components/require-auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SyncNarrators from "@/features/narrators/components/sync-narrators";
import ProfileHeader from "@/features/profile/components/profile-header";
import { ProfileSidebar } from "@/features/profile/components/profile-sidbar";
import type { PropsWithChildren } from "react";

function ProfileLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SyncNarrators />
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
                dir="rtl"
            >
                <ProfileSidebar variant="inset" />

                <SidebarInset>
                    <ProfileHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default RequireAuth(ProfileLayout);
