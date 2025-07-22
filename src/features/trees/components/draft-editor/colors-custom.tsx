"use client";

import type * as React from "react";

import {
    useColorsCustom,
    useColorsCustomState,
} from "@udecode/plate-font/react";

import { buttonVariants } from "@/components/ui/button";
// import { ColorInput } from './color-input';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { PlusIcon } from "@/components/icons";
import {
    ColorDropdownMenuItems,
    type TColor,
} from "./color-dropdown-menu-items";
import { ColorInput } from "./color-input";

type ColorCustomProps = {
    colors: TColor[];
    customColors: TColor[];
    updateColor: (color: string) => void;
    updateCustomColor: (color: string) => void;
    color?: string;
} & React.ComponentPropsWithoutRef<"div">;

export function ColorCustom({
    className,
    color,
    colors,
    customColors,
    updateColor,
    updateCustomColor,
    ...props
}: ColorCustomProps) {
    const state = useColorsCustomState({
        color,
        colors,
        customColors,
        updateCustomColor,
    });
    const { inputProps, menuItemProps } = useColorsCustom(state);

    return (
        <div
            className={cn("relative flex flex-col gap-4", className)}
            {...props}
        >
            <ColorDropdownMenuItems
                color={color}
                colors={state.computedColors}
                updateColor={updateColor}
            >
                <ColorInput {...inputProps}>
                    <DropdownMenuItem
                        className={cn(
                            buttonVariants({
                                size: "icon",
                                variant: "outline",
                            }),
                            "absolute end-2 top-1 bottom-2 flex size-8 items-center justify-center rounded-full",
                        )}
                        {...menuItemProps}
                    >
                        <span className="sr-only">Custom</span>
                        <PlusIcon />
                    </DropdownMenuItem>
                </ColorInput>
            </ColorDropdownMenuItems>
        </div>
    );
}
