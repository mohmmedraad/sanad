"use client";

import type * as React from "react";

import { ListCollapseIcon } from "@/components/icons";
import {
    useToggleToolbarButton,
    useToggleToolbarButtonState,
} from "@udecode/plate-toggle/react";

import { ToolbarButton } from "./toolbar";

export function ToggleToolbarButton(
    props: React.ComponentProps<typeof ToolbarButton>,
) {
    const state = useToggleToolbarButtonState();
    const { props: buttonProps } = useToggleToolbarButton(state);

    return (
        <ToolbarButton {...props} {...buttonProps} tooltip="قائمة قابلة للطي">
            <ListCollapseIcon />
        </ToolbarButton>
    );
}
