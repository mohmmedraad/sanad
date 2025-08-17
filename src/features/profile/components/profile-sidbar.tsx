import { LogoIcon } from "@/components/icons";
import { ModeToggleButton, ModeToggleGroup } from "@/components/mode-toggle";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavMain from "./nav-main";

export function ProfileSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar dir="rtl" collapsible="icon" side="right" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <div className="font-semibold text-base">
                                <span className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
                                    <LogoIcon className="size-6" /> سند
                                </span>
                                <span className="mx-auto hidden group-data-[collapsible=icon]:block">
                                    <LogoIcon className="size-6" />
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                {/*<SidebarGroup>   */}
                <SidebarGroupContent className="flex flex-col gap-2">
                    <SidebarMenu>
                        <ModeToggleButton className="hidden group-data-[collapsible=icon]:inline-flex" />
                    </SidebarMenu>

                    <SidebarMenu>
                        <ModeToggleGroup className="mx-auto group-data-[collapsible=icon]:hidden" />
                    </SidebarMenu>
                </SidebarGroupContent>
                {/*</SidebarGroup>*/}
            </SidebarFooter>
        </Sidebar>
    );
}
