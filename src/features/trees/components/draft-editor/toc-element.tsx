"use client";

import type { PlateElementProps } from "@udecode/plate/react";

import {
    useTocElement,
    useTocElementState,
} from "@udecode/plate-heading/react";
import { PlateElement } from "@udecode/plate/react";
import { cva } from "class-variance-authority";

import { Button } from "@/components/ui/button";

const headingItemVariants = cva(
    "block h-auto w-full cursor-pointer truncate rounded-none px-0.5 py-1.5 text-start font-medium text-muted-foreground underline decoration-[0.5px] underline-offset-4 hover:bg-accent hover:text-muted-foreground",
    {
        variants: {
            depth: {
                1: "ps-0.5",
                2: "ps-[26px]",
                3: "ps-[50px]",
            },
        },
    },
);

export function TocElement(props: PlateElementProps) {
    const state = useTocElementState();
    const { props: btnProps } = useTocElement(state);
    const { headingList } = state;

    return (
        <PlateElement {...props} className="mb-1 p-0">
            <div contentEditable={false}>
                {headingList.length > 0 ? (
                    headingList.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={headingItemVariants({
                                depth: item.depth as 1 | 2 | 3,
                            })}
                            onClick={(e) => btnProps.onClick(e, item, "smooth")}
                            aria-current
                        >
                            {item.title}
                        </Button>
                    ))
                ) : (
                    <div className="text-gray-500 text-sm">
                        أنشئ عنوانًا لعرض جدول المحتويات.
                    </div>
                )}
            </div>
            {props.children}
        </PlateElement>
    );
}
