"use client";

import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
    CalendarIcon,
    ChevronRightIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Link2Icon,
    ListIcon,
    ListOrderedIcon,
    MinusIcon,
    PilcrowIcon,
    PlusIcon,
    QuoteIcon,
    SpeechIcon,
    SquareIcon,
    TableIcon,
} from "@/components/icons";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { LinkPlugin } from "@udecode/plate-link/react";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    ParagraphPlugin,
    type PlateEditor,
    useEditorRef,
} from "@udecode/plate/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddHadithDialog from "./add-hadith-dialog";
import { ToolbarButton, ToolbarMenuGroup } from "./toolbar";
import { insertBlock, insertInlineElement } from "./transforms";

type Group = {
    group: string;
    items: Item[];
};

interface Item {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    focusEditor?: boolean;
    label?: string;
}

const groups: Group[] = [
    {
        group: "المكونات الأساسية",
        items: [
            {
                icon: <PilcrowIcon />,
                label: "فقرة",
                value: ParagraphPlugin.key,
            },
            {
                icon: <Heading1Icon />,
                label: "عنوان 1",
                value: HEADING_KEYS.h1,
            },
            {
                icon: <Heading2Icon />,
                label: "عنوان 2",
                value: HEADING_KEYS.h2,
            },
            {
                icon: <Heading3Icon />,
                label: "عنوان 3",
                value: HEADING_KEYS.h3,
            },
            {
                icon: <Heading4Icon />,
                label: "عنوان 4",
                value: HEADING_KEYS.h4,
            },
            {
                icon: <TableIcon />,
                label: "جدول",
                value: TablePlugin.key,
            },
            {
                icon: <QuoteIcon />,
                label: "اقتباس",
                value: BlockquotePlugin.key,
            },
            {
                icon: <MinusIcon />,
                label: "فاصل",
                value: HorizontalRulePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "القوائم",
        items: [
            {
                icon: <ListIcon />,
                label: "قائمة نقطية",
                value: ListStyleType.Disc,
            },
            {
                icon: <ListOrderedIcon />,
                label: "قائمة رقمية",
                value: ListStyleType.Decimal,
            },
            {
                icon: <SquareIcon />,
                label: "قائمة المهام",
                value: INDENT_LIST_KEYS.todo,
            },
            {
                icon: <ChevronRightIcon />,
                label: "قائمة قابلة للطي",
                value: TogglePlugin.key,
            },
        ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "مضمنة",
        items: [
            {
                icon: <Link2Icon />,
                label: "رابط",
                value: LinkPlugin.key,
            },
            {
                focusEditor: true,
                icon: <CalendarIcon />,
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

export function InsertDropdownMenu(props: DropdownMenuProps) {
    const editor = useEditorRef();
    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
            modal={false}
            {...props}
        >
            <DropdownMenuTrigger asChild>
                <ToolbarButton pressed={open} tooltip="إدراج" isDropdown>
                    <PlusIcon />
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
                align="start"
            >
                <ToolbarMenuGroup label={"سنة"}>
                    <AddHadithDialog>
                        <DropdownMenuItem
                            className="min-w-[180px]"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <SpeechIcon />
                            حديث
                        </DropdownMenuItem>
                    </AddHadithDialog>
                </ToolbarMenuGroup>

                {groups.map(({ group, items: nestedItems }) => (
                    <ToolbarMenuGroup key={group} label={group}>
                        {nestedItems.map(({ icon, label, value, onSelect }) => (
                            <DropdownMenuItem
                                key={value}
                                className="min-w-[180px]"
                                onSelect={() => {
                                    onSelect(editor, value);
                                    editor.tf.focus();
                                }}
                            >
                                {icon}
                                {label}
                            </DropdownMenuItem>
                        ))}
                    </ToolbarMenuGroup>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
