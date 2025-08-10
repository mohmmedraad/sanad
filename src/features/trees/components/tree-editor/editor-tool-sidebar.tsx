"use client";
import { PlusIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTreeInteractionStore } from "@/store/tree-editor-store";
import { Panel } from "@xyflow/react";
import { useState } from "react";
import type { nodeTypes } from "../../constants/tree-editor";
import {
    dispatchMobileDropNodeEvent,
    positionDragNodeElement,
    styleDragNodeElement,
} from "../../lib/utils";

const NODES_COMPONENTS: {
    title: string;
    type: keyof typeof nodeTypes;
}[] = [
    { title: "صاحب الحديث", type: "speaker" },
    { title: "راوي", type: "narrator" },
];

export default function EditorToolSidebar() {
    return (
        <Panel position="top-left">
            <InsertButton />
        </Panel>
    );
}

function InsertButton() {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id="insert-btn"
                    size="icon"
                    variant="secondary"
                    className="cursor-pointer"
                >
                    {open ? <XIcon /> : <PlusIcon />}
                </Button>
            </PopoverTrigger>

            <PopoverContent side="right" align="start" className="w-56 md:w-72">
                <h4 className="font-medium leading-none">العُقد</h4>
                <div className="mt-4 grid gap-2">
                    {NODES_COMPONENTS.map((node) => (
                        <NodeDraggable key={node.title} {...node} />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

function NodeDraggable({ title, type }: (typeof NODES_COMPONENTS)[number]) {
    const setCurrentDragedNode = useTreeInteractionStore(
        (s) => s.setCurrentDragedNode,
    );

    const startDesktopDrag = (e: React.DragEvent) => {
        e.stopPropagation();
        setCurrentDragedNode({ title, type });
    };

    const startMobileDrag = (e: TouchEvent) => {
        e.stopPropagation();
        setCurrentDragedNode({ title, type });

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const touch = e.touches[0]!;
        const dragEl = (e.currentTarget as HTMLElement)?.cloneNode(
            true,
        ) as HTMLElement;
        styleDragNodeElement(dragEl, touch.clientX, touch.clientY);

        document.body.appendChild(dragEl);

        const moveHandler = (moveEvent: TouchEvent) => {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const touch = moveEvent.touches[0]!;
            positionDragNodeElement(dragEl, touch.clientX, touch.clientY);
        };

        const endHandler = (endEvent: TouchEvent) => {
            dragEl.remove();
            dispatchMobileDropNodeEvent(endEvent, { title, type });
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("touchend", endHandler);
        };

        document.addEventListener("touchmove", moveHandler, { passive: false });
        document.addEventListener("touchend", endHandler, { passive: false });
    };

    return (
        <div
            dir="auto"
            draggable
            onDragStart={startDesktopDrag}
            // @ts-ignore — because React's TouchEvent type differs
            onTouchStart={startMobileDrag}
            className="flex touch-none select-none items-center gap-2 rounded-md border bg-card p-2 text-base text-card-foreground hover:cursor-grab hover:bg-gray-50 active:cursor-grabbing dark:hover:bg-gray-950"
        >
            {title}
        </div>
    );
}
