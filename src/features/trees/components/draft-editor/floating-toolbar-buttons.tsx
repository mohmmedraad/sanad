"use client";

import {
    BoldPlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { useEditorReadOnly } from "@udecode/plate/react";
import {
    BoldIcon,
    HighlighterIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "lucide-react";

import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
    const readOnly = useEditorReadOnly();

    return (
        <>
            {!readOnly && (
                <ToolbarGroup>
                    <TurnIntoDropdownMenu />

                    <MarkToolbarButton
                        nodeType={BoldPlugin.key}
                        tooltip="غامق (⌘+B)"
                    >
                        <BoldIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={ItalicPlugin.key}
                        tooltip="مائل (⌘+I)"
                    >
                        <ItalicIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={UnderlinePlugin.key}
                        tooltip="تحته خط (⌘+U)"
                    >
                        <UnderlineIcon />
                    </MarkToolbarButton>

                    <MarkToolbarButton
                        nodeType={StrikethroughPlugin.key}
                        tooltip="يتوسطه خط (⌘+⇧+M)"
                    >
                        <StrikethroughIcon />
                    </MarkToolbarButton>

                    {/* TODO: Fix */}
                    {/* <ColorDropdownMenu
                              nodeType={FontColorPlugin.key}
                              tooltip="لون النص"
                          >
                              <BaselineIcon />
                          </ColorDropdownMenu>

                          <ColorDropdownMenu
                              nodeType={FontBackgroundColorPlugin.key}
                              tooltip="لون الخلفية"
                          >
                              <PaintBucketIcon />
                          </ColorDropdownMenu> */}

                    <MarkToolbarButton
                        nodeType={HighlightPlugin.key}
                        tooltip="تمييز"
                    >
                        <HighlighterIcon />
                    </MarkToolbarButton>

                    <LinkToolbarButton />
                </ToolbarGroup>
            )}
        </>
    );
}
