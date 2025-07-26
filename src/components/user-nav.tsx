"use client";

import type { User } from "better-auth";
import Link from "next/link";
import { LogOutIcon, TreesIcon } from "./icons";
import LogoutButton from "./logout-button";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { UserAvatar } from "./user-avatar";

interface UserNavProps {
    user: User & {
        role?: string;
    };
}

export function UserNav({ user }: UserNavProps) {
    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative size-8 rounded-full"
                >
                    <UserAvatar user={user} className="size-8 rounded-full" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg" align="end">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                        <UserAvatar
                            user={user}
                            className="size-8 rounded-full"
                        />
                        <div className="grid flex-1 text-start text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {user.name}
                            </span>
                            <span className="truncate text-xs">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/profile/trees">
                        <DropdownMenuItem>
                            <TreesIcon className="ml-2 size-4" />
                            المشجرات
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <LogoutButton className="w-full">
                    <DropdownMenuItem>
                        <LogOutIcon className="ml-2 size-4" />
                        تسجيل الخروج
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function UserNavSkeleton() {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="size-8 rounded-full" />
        </div>
    );
}
