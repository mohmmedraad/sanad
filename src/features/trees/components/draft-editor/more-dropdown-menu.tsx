"use client";

import * as React from "react";

import { MoreHorizontalIcon } from "@/components/icons";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ExportToolbarButton } from "./export-toolbar-button";
import { ToolbarButton } from "./toolbar";

export function MoreDropdownMenu(props: DropdownMenuProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
            modal={false}
            {...props}
        >
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={open} tooltip="المزيد">
                    <MoreHorizontalIcon />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[180px] flex-col overflow-y-auto"
                align="start"
                side="top"
            >
                <ExportToolbarButton />
                {/* <ImportToolbarButton /> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
