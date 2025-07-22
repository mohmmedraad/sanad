"use client";

import type * as React from "react";

import type { TSlashInputElement } from "@udecode/plate-slash-command";

import {
    CalendarIcon,
    ChevronRightIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ListIcon,
    ListOrderedIcon,
    PilcrowIcon,
    QuoteIcon,
    SquareIcon,
    TableIcon,
} from "@/components/icons";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    ParagraphPlugin,
    type PlateEditor,
    type PlateElementProps,
} from "@udecode/plate/react";
import { PlateElement } from "@udecode/plate/react";

import {
    InlineCombobox,
    InlineComboboxContent,
    InlineComboboxEmpty,
    InlineComboboxGroup,
    InlineComboboxGroupLabel,
    InlineComboboxInput,
    InlineComboboxItem,
} from "./inline-combobox";
import { insertBlock, insertInlineElement } from "./transforms";

type Group = {
    group: string;
    items: Item[];
};

interface Item {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    className?: string;
    focusEditor?: boolean;
    keywords?: string[];
    label?: string;
}

const groups: Group[] = [
    {
        group: "المكونات الأساسية",
        items: [
            {
                icon: <PilcrowIcon />,
                keywords: ["فقرة", "نص"],
                label: "نص",
                value: ParagraphPlugin.key,
            },
            {
                icon: <Heading1Icon />,
                keywords: ["عنوان", "h1"],
                label: "عنوان 1",
                value: HEADING_KEYS.h1,
            },
            {
                icon: <Heading2Icon />,
                keywords: ["عنوان فرعي", "h2"],
                label: "عنوان 2",
                value: HEADING_KEYS.h2,
            },
            {
                icon: <Heading3Icon />,
                keywords: ["عنوان فرعي", "h3"],
                label: "عنوان 3",
                value: HEADING_KEYS.h3,
            },
            {
                icon: <Heading3Icon />,
                keywords: ["عنوان فرعي", "h4"],
                label: "عنوان 4",
                value: HEADING_KEYS.h4,
            },
            {
                icon: <ListIcon />,
                keywords: ["غير مرتبة", "ul", "-"],
                label: "قائمة نقطية",
                value: ListStyleType.Disc,
            },
            {
                icon: <ListOrderedIcon />,
                keywords: ["مرتبة", "ol", "1"],
                label: "قائمة مرقمة",
                value: ListStyleType.Decimal,
            },
            {
                icon: <SquareIcon />,
                keywords: ["قائمة تحقق", "مهمة", "خانة اختيار", "[]"],
                label: "قائمة المهام",
                value: INDENT_LIST_KEYS.todo,
            },
            {
                icon: <ChevronRightIcon />,
                keywords: ["قابلة للطي", "قابلة للتوسيع"],
                label: "قائمة قابلة للطي",
                value: TogglePlugin.key,
            },
            {
                icon: <TableIcon />,
                label: "جدول",
                value: TablePlugin.key,
            },
            {
                icon: <QuoteIcon />,
                keywords: ["اقتباس", "كتلة اقتباس", "اقتباس", ">"],
                label: "اقتباس",
                value: BlockquotePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "داخلي",
        items: [
            {
                focusEditor: true,
                icon: <CalendarIcon />,
                keywords: ["وقت"],
                label: "تاريخ",
                value: DatePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertInlineElement(editor, value);
            },
        })),
    },
];

export function SlashInputElement(
    props: PlateElementProps<TSlashInputElement>,
) {
    const { editor, element } = props;

    return (
        <PlateElement {...props} as="span" data-slate-value={element.value}>
            <InlineCombobox element={element} trigger="/">
                <InlineComboboxInput />

                <InlineComboboxContent dir="rtl">
                    <InlineComboboxEmpty>لا توجد نتائج</InlineComboboxEmpty>

                    {groups.map(({ group, items }) => (
                        <InlineComboboxGroup key={group}>
                            <InlineComboboxGroupLabel>
                                {group}
                            </InlineComboboxGroupLabel>

                            {items.map(
                                ({
                                    focusEditor,
                                    icon,
                                    keywords,
                                    label,
                                    value,
                                    onSelect,
                                }) => (
                                    <InlineComboboxItem
                                        key={value}
                                        value={value}
                                        onClick={() => onSelect(editor, value)}
                                        label={label}
                                        focusEditor={focusEditor}
                                        group={group}
                                        keywords={keywords}
                                    >
                                        <div className="me-2 text-muted-foreground">
                                            {icon}
                                        </div>
                                        {label ?? value}
                                    </InlineComboboxItem>
                                ),
                            )}
                        </InlineComboboxGroup>
                    ))}
                </InlineComboboxContent>
            </InlineCombobox>

            {props.children}
        </PlateElement>
    );
}
