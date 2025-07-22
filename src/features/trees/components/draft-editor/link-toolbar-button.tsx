"use client";

import type * as React from "react";

import { LinkIcon } from "@/components/icons";
import {
    useLinkToolbarButton,
    useLinkToolbarButtonState,
} from "@udecode/plate-link/react";

import { ToolbarButton } from "./toolbar";

export function LinkToolbarButton(
    props: React.ComponentProps<typeof ToolbarButton>,
) {
    const state = useLinkToolbarButtonState();
    const { props: buttonProps } = useLinkToolbarButton(state);

    return (
        <ToolbarButton
            {...props}
            {...buttonProps}
            data-plate-focus
            tooltip="رابط"
        >
            <LinkIcon />
        </ToolbarButton>
    );
}
