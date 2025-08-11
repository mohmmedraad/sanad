"use client";

import { useEditorReadOnly } from "@udecode/plate/react";

import { AlignDropdownMenu } from "./align-dropdown-menu";
import { RedoToolbarButton, UndoToolbarButton } from "./history-toolbar-button";
import {
    BulletedIndentListToolbarButton,
    NumberedIndentListToolbarButton,
} from "./indent-list-toolbar-button";
import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { ToggleToolbarButton } from "./toggle-toolbar-button";
import { ToolbarGroup } from "./toolbar";

export function FixedToolbarButtons() {
    const readOnly = useEditorReadOnly();

    return (
        <div className="flex w-full">
            {!readOnly && (
                <>
                    <MoreDropdownMenu />

                    <ToolbarGroup>
                        <LinkToolbarButton />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <AlignDropdownMenu />

                        <NumberedIndentListToolbarButton />
                        <BulletedIndentListToolbarButton />
                        <IndentTodoToolbarButton />
                        <ToggleToolbarButton />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <InsertDropdownMenu />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <RedoToolbarButton />
                        <UndoToolbarButton />
                    </ToolbarGroup>
                </>
            )}
        </div>
    );
}
