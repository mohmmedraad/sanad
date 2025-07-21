"use client";

import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import type { TElement } from "@udecode/plate";

import { DropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    ParagraphPlugin,
    useEditorRef,
    useSelectionFragmentProp,
} from "@udecode/plate/react";
import {
    CheckIcon,
    ChevronRightIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    ListIcon,
    ListOrderedIcon,
    PilcrowIcon,
    QuoteIcon,
    SquareIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ToolbarButton, ToolbarMenuGroup } from "./toolbar";
import { STRUCTURAL_TYPES, getBlockType, setBlockType } from "./transforms";

const turnIntoItems = [
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
        icon: <Heading4Icon />,
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
        icon: <QuoteIcon />,
        keywords: ["اقتباس", "كتلة اقتباس", ">"],
        label: "اقتباس",
        value: BlockquotePlugin.key,
    },
];

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
    const editor = useEditorRef();
    const [open, setOpen] = React.useState(false);

    const value = useSelectionFragmentProp({
        defaultValue: ParagraphPlugin.key,
        structuralTypes: STRUCTURAL_TYPES,
        getProp: (node) => getBlockType(node as TElement),
    });
    const selectedItem = React.useMemo(
        () =>
            turnIntoItems.find(
                (item) => item.value === (value ?? ParagraphPlugin.key),
            ) ?? turnIntoItems[0],
        [value],
    );

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
            modal={false}
            {...props}
        >
            <DropdownMenuTrigger asChild>
                <ToolbarButton
                    className="min-w-[125px]"
                    pressed={open}
                    tooltip="تحويل إلى"
                    isDropdown
                >
                    {selectedItem?.label}
                </ToolbarButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="ignore-click-outside/toolbar min-w-0"
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    editor.tf.focus();
                }}
                align="start"
            >
                <ToolbarMenuGroup
                    value={value}
                    onValueChange={(type) => {
                        setBlockType(editor, type);
                    }}
                    label="تغير الى"
                >
                    {turnIntoItems.map(({ icon, label, value: itemValue }) => (
                        <DropdownMenuRadioItem
                            key={itemValue}
                            className="min-w-[180px] pl-2 *:first:[span]:hidden"
                            value={itemValue}
                        >
                            <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                                <DropdownMenuItemIndicator>
                                    <CheckIcon />
                                </DropdownMenuItemIndicator>
                            </span>
                            {icon}
                            {label}
                        </DropdownMenuRadioItem>
                    ))}
                </ToolbarMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
