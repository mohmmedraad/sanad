"use client";

import { cn } from "@/lib/utils";

import { Toolbar } from "./toolbar";

export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
    return (
        <Toolbar
            {...props}
            className={cn(
                "-translate-x-1/2 scrollbar-hide absolute bottom-10 left-1/2 z-50 mx-auto w-[calc(100%-16px)] max-w-max justify-between overflow-x-auto rounded-xl border border-border bg-background/10 p-1 shadow-sm backdrop-blur-sm supports-backdrop-blur:bg-background/60",
                props.className,
            )}
        />
    );
}
