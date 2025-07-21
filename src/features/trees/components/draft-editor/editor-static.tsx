import type { VariantProps } from "class-variance-authority";

import { PlateStatic, type PlateStaticProps } from "@udecode/plate";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const editorVariants = cva(
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
                select: "px-3 py-2 text-base data-readonly:w-fit",
            },
        },
    },
);

export function EditorStatic({
    className,
    variant,
    ...props
}: PlateStaticProps & VariantProps<typeof editorVariants>) {
    return (
        <PlateStatic
            className={cn(editorVariants({ variant }), className)}
            {...props}
        />
    );
}
