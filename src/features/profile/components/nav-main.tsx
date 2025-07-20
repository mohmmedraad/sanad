"use client";
import { TreesIcon } from "@/components/icons";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        title: "المشجرات",
        url: "/profile/trees",
        icon: TreesIcon,
    },
];

export default function NavMain() {
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {links.map((link) => (
                        <SidebarMenuItem key={link.title}>
                            <Link href={link.url}>
                                <SidebarMenuButton
                                    tooltip={link.title}
                                    data-active={pathname === link.url}
                                >
                                    {link.icon && <link.icon />}
                                    <span>{link.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
