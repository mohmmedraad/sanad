"use client";

import { DatePlugin } from "@udecode/plate-date/react";
import { DocxPlugin } from "@udecode/plate-docx";
import {
    FontBackgroundColorPlugin,
    FontColorPlugin,
    FontSizePlugin,
} from "@udecode/plate-font/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnPlugin } from "@udecode/plate-layout/react";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { alignPlugin } from "./align-plugin";
import { autoformatPlugin } from "./autoformat-plugin";
import { basicNodesPlugins } from "./basic-nodes-plugins";
import { blockMenuPlugins } from "./block-menu-plugins";
import { deletePlugins } from "./delete-plugins";
import { dndPlugins } from "./dnd-plugins";
import { exitBreakPlugin } from "./exit-break-plugin";
import { FloatingToolbarPlugin } from "./floating-toolbar-plugin";
import { HadithPlugin } from "./hadith-plugin";
import { indentListPlugins } from "./indent-list-plugins";
import { linkPlugin } from "./link-plugin";
import { markdownPlugin } from "./markdown-plugin";
import { mentionPlugin } from "./mention-plugin";
import { resetBlockTypePlugin } from "./reset-block-type-plugin";
import { skipMarkPlugin } from "./skip-mark-plugin";
import { softBreakPlugin } from "./soft-break-plugin";
import { tablePlugin } from "./table-plugin";
import { tocPlugin } from "./toc-plugin";

export const viewPlugins = [
    ...basicNodesPlugins,
    HorizontalRulePlugin,
    linkPlugin,
    DatePlugin,
    mentionPlugin,
    tablePlugin,
    TogglePlugin,
    tocPlugin,
    ColumnPlugin,
    HadithPlugin,

    // Marks
    FontColorPlugin,
    FontBackgroundColorPlugin,
    FontSizePlugin,
    HighlightPlugin,
    KbdPlugin,
    skipMarkPlugin,

    // Block Style
    alignPlugin,
    ...indentListPlugins,
] as const;

export const editorPlugins = [
    // Nodes
    ...viewPlugins,

    // Functionality
    SlashPlugin.extend({
        options: {},
    }),
    autoformatPlugin,
    ...blockMenuPlugins,
    ...dndPlugins,
    exitBreakPlugin,
    resetBlockTypePlugin,
    ...deletePlugins,
    softBreakPlugin,
    TrailingBlockPlugin,

    // Deserialization
    DocxPlugin,
    markdownPlugin,
    JuicePlugin,

    // UI
    FloatingToolbarPlugin,
];
