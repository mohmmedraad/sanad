import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProfileHeader from "@/features/profile/components/profile-header";
import { ProfileSidebar } from "@/features/profile/components/profile-sidbar";
import type { PropsWithChildren } from "react";

export default function ProfileLayout({ children }: PropsWithChildren) {
    return (
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
    );
}
