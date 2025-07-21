"use client";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HEADING_LEVELS } from "@udecode/plate-heading";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { ResetNodePlugin } from "@udecode/plate-reset-node/react";
import { ParagraphPlugin } from "@udecode/plate/react";
import { HadithPlugin } from "./hadith-plugin";

const resetBlockTypesCommonRule = {
    defaultType: ParagraphPlugin.key,
    types: [
        ...HEADING_LEVELS,
        BlockquotePlugin.key,
        INDENT_LIST_KEYS.todo,
        ListStyleType.Disc,
        ListStyleType.Decimal,
        HadithPlugin.key,
    ],
};

export const resetBlockTypePlugin = ResetNodePlugin.configure({
    options: {
        rules: [
            {
                ...resetBlockTypesCommonRule,
                hotkey: "Enter",
                predicate: (editor) =>
                    editor.api.isEmpty(editor.selection, { block: true }),
            },
            {
                ...resetBlockTypesCommonRule,
                hotkey: "Backspace",
                predicate: (editor) => editor.api.isAt({ start: true }),
            },
        ],
    },
});
