"use client";

import type { PlateEditor } from "@udecode/plate/react";

import {
    type NodeEntry,
    type Path,
    PathApi,
    type TElement,
} from "@udecode/plate";
import { insertDate } from "@udecode/plate-date";
import { DatePlugin } from "@udecode/plate-date/react";
import { insertToc } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { insertColumnGroup, toggleColumnGroup } from "@udecode/plate-layout";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin, triggerFloatingLink } from "@udecode/plate-link/react";
import {
    TableCellPlugin,
    TablePlugin,
    TableRowPlugin,
} from "@udecode/plate-table/react";
import { HadithPlugin } from "./plugins/hadith-plugin";

export const STRUCTURAL_TYPES: string[] = [
    ColumnPlugin.key,
    ColumnItemPlugin.key,
    TablePlugin.key,
    TableRowPlugin.key,
    TableCellPlugin.key,
];

const ACTION_THREE_COLUMNS = "action_three_columns";

const insertList = (editor: PlateEditor, type: string) => {
    editor.tf.insertNodes(
        editor.api.create.block({
            indent: 1,
            listStyleType: type,
        }),
        { select: true },
    );
};

const insertHadith = (editor: PlateEditor, type: string) => {
    editor.tf.insertNode(
        editor.api.create.block({
            type,
            children: [],
        }),
        { select: true },
    );
};

const insertBlockMap: Record<
    string,
    (editor: PlateEditor, type: string) => void
> = {
    [INDENT_LIST_KEYS.todo]: insertList,
    [ListStyleType.Decimal]: insertList,
    [ListStyleType.Disc]: insertList,
    [ACTION_THREE_COLUMNS]: (editor) =>
        insertColumnGroup(editor, { columns: 3, select: true }),
    [TablePlugin.key]: (editor) =>
        editor.getTransforms(TablePlugin).insert.table({}, { select: true }),
    [TocPlugin.key]: (editor) => insertToc(editor, { select: true }),
    [HadithPlugin.key]: insertHadith,
};

const insertInlineMap: Record<
    string,
    (editor: PlateEditor, type: string) => void
> = {
    [DatePlugin.key]: (editor) => insertDate(editor, { select: true }),
    [LinkPlugin.key]: (editor) =>
        triggerFloatingLink(editor, { focused: true }),
};

export const insertBlock = (editor: PlateEditor, type: string) => {
    editor.tf.withoutNormalizing(() => {
        const block = editor.api.block();
        console.log(block, type);

        if (!block) return;
        if (type in insertBlockMap) {
            insertBlockMap[type]?.(editor, type);
            console.log("it is in the insertBlockMap");
        } else {
            editor.tf.insertNodes(editor.api.create.block({ type }), {
                at: PathApi.next(block[1]),
                select: true,
            });
        }
    });
};

export const insertInlineElement = (editor: PlateEditor, type: string) => {
    if (insertInlineMap[type]) {
        insertInlineMap[type](editor, type);
    }
};

const setList = (
    editor: PlateEditor,
    type: string,
    entry: NodeEntry<TElement>,
) => {
    editor.tf.setNodes(
        editor.api.create.block({
            indent: 1,
            listStyleType: type,
        }),
        {
            at: entry[1],
        },
    );
};

const setBlockMap: Record<
    string,
    (editor: PlateEditor, type: string, entry: NodeEntry<TElement>) => void
> = {
    [INDENT_LIST_KEYS.todo]: setList,
    [ListStyleType.Decimal]: setList,
    [ListStyleType.Disc]: setList,
    [ACTION_THREE_COLUMNS]: (editor) =>
        toggleColumnGroup(editor, { columns: 3 }),
};

export const setBlockType = (
    editor: PlateEditor,
    type: string,
    { at }: { at?: Path } = {},
) => {
    editor.tf.withoutNormalizing(() => {
        const setEntry = (entry: NodeEntry<TElement>) => {
            const [node, path] = entry;

            if (node[IndentListPlugin.key]) {
                editor.tf.unsetNodes([IndentListPlugin.key, "indent"], {
                    at: path,
                });
            }
            if (type in setBlockMap) {
                return setBlockMap[type]?.(editor, type, entry);
            }
            if (node.type !== type) {
                editor.tf.setNodes({ type }, { at: path });
            }
        };
        if (at) {
            const entry = editor.api.node<TElement>(at);

            if (entry) {
                setEntry(entry);

                return;
            }
        }

        const entries = editor.api.blocks({ mode: "lowest" });

        // biome-ignore lint/complexity/noForEach: <explanation>
        entries.forEach((entry) => setEntry(entry));
    });
};

export const getBlockType = (block: TElement) => {
    if (block[IndentListPlugin.key]) {
        if (block[IndentListPlugin.key] === ListStyleType.Decimal) {
            return ListStyleType.Decimal;
            // biome-ignore lint/style/noUselessElse: <explanation>
        } else if (block[IndentListPlugin.key] === INDENT_LIST_KEYS.todo) {
            return INDENT_LIST_KEYS.todo;
            // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
            return ListStyleType.Disc;
        }
    }

    return block.type;
};
