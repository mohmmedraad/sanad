"use client";

import * as React from "react";

import type { PlateContentProps } from "@udecode/plate/react";
import type { VariantProps } from "class-variance-authority";

import { PlateContainer, PlateContent } from "@udecode/plate/react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const editorContainerVariants = cva(
    "relative w-full cursor-text select-text overflow-y-auto caret-primary selection:bg-primary/25 focus-visible:outline-none [&_.slate-selection-area]:z-50 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary/25 [&_.slate-selection-area]:bg-primary/15",
    {
        defaultVariants: {
            variant: "default",
        },
        variants: {
            variant: {
                comment: cn(
                    "flex flex-wrap justify-between gap-1 px-1 py-0.5 text-sm",
                    "rounded-md border-[1.5px] border-transparent bg-transparent",
                    "has-[[data-slate-editor]:focus]:border-primary/50 has-[[data-slate-editor]:focus]:ring-2 has-[[data-slate-editor]:focus]:ring-primary/30",
                    "has-aria-disabled:border-input has-aria-disabled:bg-muted",
                ),
                default: "h-[650px]",
                select: cn(
                    "group rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    "has-data-readonly:w-fit has-data-readonly:cursor-default has-data-readonly:border-transparent has-data-readonly:focus-within:[box-shadow:none]",
                ),
            },
        },
    },
);

export const EditorContainer = ({
    className,
    variant,
    ...props
}: React.ComponentProps<"div"> &
    VariantProps<typeof editorContainerVariants>) => {
    return (
        <PlateContainer
            className={cn(
                "ignore-click-outside/toolbar",
                editorContainerVariants({ variant }),
                className,
            )}
            {...props}
        />
    );
};

EditorContainer.displayName = "EditorContainer";

const editorVariants = cva(
    cn(
        "group/editor",
        "relative w-full cursor-text select-text overflow-x-hidden whitespace-pre-wrap break-words",
        "rounded-md ring-offset-background focus-visible:outline-none",
        "placeholder:text-muted-foreground/80 **:data-slate-placeholder:top-[auto_!important] **:data-slate-placeholder:text-muted-foreground/80 **:data-slate-placeholder:opacity-100!",
        "[&_strong]:font-bold",
    ),
    {
        defaultVariants: {
            variant: "default",
        },
        variants: {
            disabled: {
                true: "cursor-not-allowed opacity-50",
            },
            focused: {
                true: "ring-2 ring-ring ring-offset-2",
            },
            variant: {
                default:
                    "size-full px-16 pt-4 pb-72 text-base sm:px-[max(64px,calc(50%-350px))]",
            },
        },
    },
);

export type EditorProps = PlateContentProps &
    VariantProps<typeof editorVariants>;

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
    ({ className, disabled, focused, variant, ...props }, ref) => {
        return (
            <PlateContent
                dir="rtl"
                ref={ref}
                className={cn(
                    editorVariants({
                        disabled,
                        focused,
                        variant,
                    }),
                    className,
                )}
                disabled={disabled}
                disableDefaultStyles
                {...props}
            />
        );
    },
);

Editor.displayName = "Editor";
