"use client";

import * as React from "react";

import type { TMentionElement } from "@udecode/plate-mention";
import type { PlateElementProps } from "@udecode/plate/react";

import { IS_APPLE } from "@udecode/plate";
import {
    PlateElement,
    useFocused,
    useReadOnly,
    useSelected,
} from "@udecode/plate/react";

import NarratorTooltip from "@/components/narrator-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMounted } from "@/hooks/use-mounted";
import { useNarratorLiveQuery } from "@/hooks/use-narrators";
import { cn } from "@/lib/utils";

export function MentionElement(
    props: PlateElementProps<TMentionElement> & {
        prefix?: string;
    },
) {
    const element = props.element;
    const selected = useSelected();
    const focused = useFocused();
    const mounted = useMounted();
    const readOnly = useReadOnly();
    const narrator = useNarratorLiveQuery(Number(element.key));

    return (
        <PlateElement
            {...props}
            className={cn(
                "inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline font-medium text-sm",
                !readOnly && "cursor-pointer",
                selected && focused && "ring-2 ring-ring",
                element.children[0]?.bold === true && "font-bold",
                element.children[0]?.italic === true && "italic",
                element.children[0]?.underline === true && "underline",
            )}
            attributes={{
                ...props.attributes,
                contentEditable: false,
                "data-slate-value": element.value,
                draggable: true,
            }}
        >
            <TooltipProvider>
                {mounted && IS_APPLE ? (
                    <NarratorTooltip narrator={narrator}>
                        <React.Fragment>
                            {props.children}
                            {props.prefix}
                            {element.value}
                        </React.Fragment>
                    </NarratorTooltip>
                ) : (
                    <NarratorTooltip narrator={narrator}>
                        {props.prefix}
                        {element.value}
                        {props.children}
                    </NarratorTooltip>
                )}
            </TooltipProvider>
        </PlateElement>
    );
}
