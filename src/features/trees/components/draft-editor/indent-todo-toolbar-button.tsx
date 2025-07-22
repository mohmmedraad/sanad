"use client";

import type * as React from "react";

import { ListTodoIcon } from "@/components/icons";
import {
    useIndentTodoToolBarButton,
    useIndentTodoToolBarButtonState,
} from "@udecode/plate-indent-list/react";

import { ToolbarButton } from "./toolbar";

export function IndentTodoToolbarButton(
    props: React.ComponentProps<typeof ToolbarButton>,
) {
    const state = useIndentTodoToolBarButtonState({ nodeType: "todo" });
    const { props: buttonProps } = useIndentTodoToolBarButton(state);

    return (
        <ToolbarButton {...props} {...buttonProps} tooltip="قائمة المهام">
            <ListTodoIcon />
        </ToolbarButton>
    );
}
