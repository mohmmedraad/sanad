"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { Panel } from "@xyflow/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { nodeTypes } from "../../constants/tree-editor";
import type { MobileDropEvent } from "../../types/tree-editor";

export default function EditorToolSidebar() {
    return (
        <Panel position={"top-left"}>
            <InsertButton />
        </Panel>
    );
}

export const NODES_COMPONENTS: {
    title: string;
    type: keyof typeof nodeTypes;
}[] = [
    {
        title: "صاحب الحديث",
        type: "speaker",
    },
    {
        title: "راوي",
        type: "narrator",
    },
];

function InsertButton() {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="cursor-pointer"
                    variant={"secondary"}
                    id="insert-btn"
                    size="icon"
                >
                    {!open && <Plus />}
                    {open && <X />}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-56 md:w-72">
                <h4 className="font-medium leading-none">العُقد</h4>
                <div className="mt-4 grid gap-2">
                    {NODES_COMPONENTS.map((c) => (
                        <ComponentsPanelComponent key={c.title} {...c} />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

function ComponentsPanelComponent({
    title,
    type,
}: (typeof NODES_COMPONENTS)[number]) {
    const setCurrentDragedNode = useTreeEditorStore(
        (state) => state.setCurrentDragedNode,
    );

    const handleTouchStart = (e: TouchEvent) => {
        // e.preventDefault();
        e.stopPropagation();

        setCurrentDragedNode({
            title,
            type,
        });

        // Create a visual feedback element for mobile
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const touch = e.touches[0]!;
        // @ts-ignore
        const dragElement = e.currentTarget?.cloneNode(true);
        dragElement.style.position = "fixed";
        dragElement.style.top = `${touch.clientY - 20}px`;
        dragElement.style.left = `${touch.clientX - 50}px`;
        dragElement.style.opacity = "0.8";
        dragElement.style.pointerEvents = "none";
        dragElement.style.zIndex = "9999";
        dragElement.style.transform = "rotate(5deg)";
        dragElement.id = "mobile-drag-element";

        document.body.appendChild(dragElement);

        // Store initial touch position
        const initialX = touch.clientX;
        const initialY = touch.clientY;

        const handleTouchMove = (moveEvent: TouchEvent) => {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const currentTouch = moveEvent.touches[0]!;
            const dragEl = document.getElementById("mobile-drag-element");

            if (dragEl) {
                dragEl.style.left = `${currentTouch.clientX - 50}px`;
                dragEl.style.top = `${currentTouch.clientY - 20}px`;
            }
        };

        const handleTouchEnd = (endEvent: TouchEvent) => {
            // Clean up the drag element
            const dragEl = document.getElementById("mobile-drag-element");
            if (dragEl) {
                dragEl.remove();
            }

            // Find the element under the touch point
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const touch = endEvent.changedTouches[0]!;
            const elementBelow = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
            );

            // Trigger drop event on the target element if it accepts drops
            if (elementBelow) {
                const dropEvent = new CustomEvent("mobileDrop", {
                    detail: {
                        title,
                        type,
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                    },
                }) satisfies MobileDropEvent;
                document.dispatchEvent(dropEvent);
            }

            // Remove event listeners
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };

        // Add event listeners for move and end
        document.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        document.addEventListener("touchend", handleTouchEnd, {
            passive: false,
        });
    };

    return (
        <div
            dir="auto"
            draggable
            onDragStart={(e) => {
                e.stopPropagation();
                setCurrentDragedNode({
                    title,
                    type,
                });
            }}
            // @ts-ignore
            onTouchStart={handleTouchStart}
            className="flex touch-none select-none flex-row items-center gap-2 space-y-0 rounded-md border bg-card p-2 text-base text-card-foreground shadow-none hover:cursor-grab hover:bg-gray-50 active:cursor-grabbing dark:hover:bg-gray-950"
        >
            {title}
        </div>
    );
}
