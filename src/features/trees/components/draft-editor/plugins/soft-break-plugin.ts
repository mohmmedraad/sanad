"use client";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { SoftBreakPlugin } from "@udecode/plate-break/react";
import {
    TableCellHeaderPlugin,
    TableCellPlugin,
} from "@udecode/plate-table/react";
import { HadithPlugin } from "./hadith-plugin";

export const softBreakPlugin = SoftBreakPlugin.configure({
    options: {
        rules: [
            { hotkey: "shift+enter" },
            {
                hotkey: "enter",
                query: {
                    allow: [
                        BlockquotePlugin.key,
                        TableCellPlugin.key,
                        TableCellHeaderPlugin.key,
                        HadithPlugin.key,
                    ],
                },
            },
        ],
    },
});
